"use client";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaPlus, FaStar } from "react-icons/fa";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import useOrder from "@/hooks/useOrder";
import useReview from "@/hooks/useReview";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { maxSize, storeId, supportedImageTypes } from "@/libs/utils/common";
import useFileUpload from "@/hooks/UploadFiles/useFileUploadHooks";
import imageRename from "@/libs/utils/imageRename";
import Image from "next/image";
import useMoveAssetsSellerHooks from "@/hooks/UploadFiles/useMoveAssetsSellerHooks";

const OrderReview = ({ params }) => {
  const inputRef = useRef();
  const route = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [previewImageName, setPreviewImageName] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const { getOrdersByOrderNumber } = useOrder();
  const { createReview } = useReview();
  const {
    data: orderDetails = {},
    isLoading: isOrderDetailsLoading,
    refetch: refetchOrderDetails,
  } = useQuery({
    queryKey: ["orderDetails", params?.orderId],
    queryFn: () => getOrdersByOrderNumber(params?.orderId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("orderDetails", orderDetails);

  const handleFilesSelect = (event) => {
    setSelectedFile([]);
    const totalImages = event.target.files.length;

    if (totalImages > 5) {
      toast.error("You can upload a maximum of 5 images!");
      return;
    }

    let files = Array.from(event.target.files); // Convert files into an array
    files = imageRename(files);
    console.log("sanitizedFiles", files);

    const previewImageArray = [];
    const largeFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if the selected file is a supported image
      if (!supportedImageTypes.includes(file.type)) {
        toast.error(
          "Unsupported image type. Please upload a supported image (JPEG, PNG, GIF, WebP, svg, bmp,,tiff, ico, jp2)."
        );
        return;
      }

      // Check file size
      if (file.size > maxSize) {
        largeFiles.push(file);
        toast.error(
          `The image "${file.name}" exceeds the maximum file size of 4MB and cannot be uploaded.`
        );
      } else {
        const previewImage = URL.createObjectURL(file);
        previewImageArray.push(previewImage);
      }
    }

    setIsUploading(true); // Set uploading status to true

    setPreviewImages(previewImageArray);
    setSelectedFile([...files.filter((file) => !largeFiles.includes(file))]);
  };

  useFileUpload(
    selectedFile,
    setImageUploadProgress,
    setPreviewImageName,
    setImageList,
    setIsUploading
  );

  console.log("imageList", imageList);
  console.log("previewImages", previewImages);
  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    const images = imageList.map((image) => image.split("/")[2]);

    const destPathText = `${orderDetails?.data?.storeId}/reviews`;

    useMoveAssetsSellerHooks(imageList, destPathText);

    const reviewData = {
      storeId: storeId,
      userId: orderDetails?.data?.customerId,
      orderId: orderDetails?.data?._id,
      productIds: orderDetails?.data?.items.map((item) => item.product),
      reviewTexts: data.reviewTexts,
      ratings: data.ratings,
      deliveryReviewText: data.deliveryReviewText,
      deliveryRating: data.deliveryRating,
      images: images,
    };

    console.log("reviewData", reviewData);

    try {
      await createReview(reviewData);
      toast.success("Review submitted successfully!");
      route.push("/profile/reviews");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review.");
    }
  };

  console.log("orderDetails?.data?.reviewIds", orderDetails?.data?.reviewIds);

  if (isOrderDetailsLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderDetails.data?.items?.map((item, index) => (
            <div
              key={item._id}
              className={`flex flex-col gap-2 p-4 mb-4 rounded-lg shadow-md border ${
                orderDetails.data?.items?.length > 1
                  ? "col-span-1"
                  : "col-span-3"
              }`}
            >
              <div className="text-sm">
                <strong>Product:</strong> {item.productName}
              </div>
              <div className="text-sm">
                <strong>Quantity:</strong> {item.quantity}
              </div>
              <div className="text-sm">
                <strong>Price:</strong> ${item.price}
              </div>
              <div className="text-sm">
                <strong>Review:</strong>
                <textarea
                  className="input-box h-fit w-full p-3 border rounded"
                  {...register(`reviewTexts[${index}]`)}
                  placeholder="Write your review here..."
                  value={orderDetails?.data?.reviewIds[index]?.reviewText}
                  readOnly={orderDetails?.data?.reviewIds[index]?.reviewText}
                ></textarea>
              </div>
              <div className="text-sm">
                <strong>Rating:</strong>
                <Controller
                  name={`ratings[${index}]`}
                  control={control}
                  defaultValue={
                    orderDetails?.data?.reviewIds[index]?.rating || 0
                  }
                  render={({ field }) => (
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${
                            field.value >= star
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          onClick={() => field.onChange(star)}
                        />
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="border p-4 mb-4 rounded-lg shadow-md">
          <div className="mb-2">
            <strong>Delivery Review:</strong>
            <textarea
              className="input-box h-fit w-full p-3 border rounded"
              {...register("deliveryReviewText")}
              placeholder="Write your delivery review here..."
              value={orderDetails?.data?.deliveryReview?.reviewText}
              readOnly={orderDetails?.data?.deliveryReview?.reviewText}
            ></textarea>
          </div>
          <div className="mb-2">
            <strong>Delivery Rating:</strong>
            <Controller
              name="deliveryRating"
              control={control}
              defaultValue={orderDetails?.data?.deliveryReview?.rating || 0}
              render={({ field }) => (
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${
                        field.value >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => field.onChange(star)}
                    />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-5">
          <div className="h-32 w-32 border border-dashed flex justify-center items-center text-3xl border-black relative">
            <input
              ref={inputRef}
              onChange={handleFilesSelect}
              accept="image/*"
              multiple
              type="file"
              name="image"
              className="absolute opacity-0 w-full h-full"
              placeholder="Enter number of designers"
            />
            <FaPlus />
          </div>
          <div className="flex items-center gap-2">
            {previewImages?.length > 0 &&
              previewImages?.map((item, index) => (
                <div
                  key={index}
                  className="bg-black rounded-lg bg-opacity-5 w-fit p-1 relative"
                >
                  <div className="flex flex-col justify-center items-center h-full w-full">
                    <Image src={item} alt="" width={128} height={128} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {orderDetails?.data?.reviewIds?.length === 0 && (
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        )}
      </form>
    </div>
  );
};

export default OrderReview;
