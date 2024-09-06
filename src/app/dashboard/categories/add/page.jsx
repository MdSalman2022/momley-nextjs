"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useFileUpload from "@/hooks/UploadFiles/useFileUploadHooks";
import useMoveAssetsSellerHooks from "@/hooks/UploadFiles/useMoveAssetsSellerHooks";
import useCategory from "@/hooks/useCategory";
import { handleFilesSelect, storeId } from "@/libs/utils/common";
import TagsInput from "@/libs/utils/tagsInput";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";
import { useQuery } from "react-query";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreateCategoryPage = () => {
  const { userInfo } = useContext(StateContext);
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [previewImageName, setPreviewImageName] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const [selectedBanner, setSelectedBanner] = useState(null);
  const [BannerImageUploadProgress, setBannerImageUploadProgress] = useState(0);
  const [previewBannerImageName, setPreviewBannerImageName] = useState("");
  const [BannerImageList, setBannerImageList] = useState([]);
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const [previewBannerImages, setPreviewBannerImages] = useState([]);

  const [selectedSocial, setSelectedSocial] = useState(null);
  const [SocialImageUploadProgress, setSocialImageUploadProgress] = useState(0);
  const [previewSocialImageName, setPreviewSocialImageName] = useState("");
  const [SocialImageList, setSocialImageList] = useState([]);
  const [isSocialUploading, setIsSocialUploading] = useState(false);
  const [previewSocialImages, setPreviewSocialImages] = useState([]);

  const [descriptionValue, setDescriptionValue] = useState("");

  const handleDescriptionChange = (value) => {
    console.log("value", value);
    setDescriptionValue(value);
    setValue("description", value, { shouldValidate: true });
  };

  const [tags, setTags] = useState([]);

  const { getAllCategoriesLevel, CreateCategory } = useCategory();

  const handleImageUpload = (event) => {
    const files = event.target.files;
    console.log("files", files);
    const limit = 1;
    if (files?.length > 0) {
      handleFilesSelect(
        files,
        setSelectedFile,
        setIsUploading,
        setPreviewImages,
        limit
      );
    }
  };

  useFileUpload(
    selectedFile,
    setImageUploadProgress,
    setPreviewImageName,
    setImageList,
    setIsUploading
  );

  const handleBannerImageUpload = (event) => {
    const files = event.target.files;
    console.log("files", files);
    const limit = 1;
    if (files?.length > 0) {
      handleFilesSelect(
        files,
        setSelectedBanner,
        setIsBannerUploading,
        setPreviewBannerImages,
        limit
      );
    }
  };

  useFileUpload(
    selectedBanner,
    setBannerImageUploadProgress,
    setPreviewBannerImageName,
    setBannerImageList,
    setIsBannerUploading
  );

  const handleSocialImageUpload = (event) => {
    const files = event.target.files;
    console.log("files", files);
    const limit = 1;
    if (files?.length > 0) {
      handleFilesSelect(
        files,
        setSelectedSocial,
        setIsSocialUploading,
        setPreviewSocialImages,
        limit
      );
    }
  };

  useFileUpload(
    selectedSocial,
    setSocialImageUploadProgress,
    setPreviewSocialImageName,
    setSocialImageList,
    setIsSocialUploading
  );

  console.log("previewImages", previewImages);

  const {
    data: categories = {},
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categories", storeId],
    queryFn: () => storeId && getAllCategoriesLevel(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);

    const images = imageList.map((image) => image.split("/")[2]);
    const bannerImages = BannerImageList.map((image) => image.split("/")[2]);
    const metaImage = SocialImageList.map((image) => image.split("/")[2]);
    // Handle form submission
    const payload = {
      storeId: storeId,
      categoryLevel: categories?.data[0]._id,
      level: 1,
      menuId: "",
      name: data?.categoryName,
      description: data?.description,
      image: images[0],
      bannerImages: {
        webImage: bannerImages[0],
      },
      seoProperties: {
        metaTitle: data?.metaTitle,
        metaDescription: data?.metaDescription,
        metaLink: data?.metaLink,
        metaImage: metaImage[0],
      },
    };
    console.log("payload", payload);

    const destPathText = `${userInfo?.store?._id}/categories`;

    const allImages = [...imageList, ...BannerImageList, ...SocialImageList];

    useMoveAssetsSellerHooks(allImages, destPathText);
    try {
      const response = await CreateCategory(payload);
      if (response?.success) {
        refetchCategory();
        toast.success("Category added successfully");
        router.push("/dashboard/categories");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Category</h1>
        <button
          form="categoryForm"
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update
        </button>
      </div>

      <form id="categoryForm" onSubmit={handleSubmit(onSubmit)}>
        {/* Category Image and Name Section */}
        <div className="bg-white p-6 rounded-lg border mb-6 flex flex-col gap-5">
          <h2 className="font-semibold text-gray-600">Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Category Image
              </label>
              <div className="flex items-center gap-3">
                <div className="relative border h-32 w-32 flex flex-col items-center justify-center text-5xl">
                  <AiOutlineCamera />
                  <input
                    type="file"
                    {...register("categoryImage")}
                    onChange={handleImageUpload}
                    accept="image/*"
                    name="image"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    placeholder="Enter number of designers"
                  />
                </div>
                {previewImages.map((image, index) => (
                  <img src={image} className="object-cover h-32 w-32" />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                {...register("categoryName", { required: true })}
                className="input-box w-full"
              />
              {errors.categoryName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Banner Section */}
        <div className="bg-white p-6 rounded-lg border mb-6 flex flex-col gap-5">
          <h2 className="font-semibold text-gray-600">Banner</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Banner Image
              </label>
              <div className="flex gap-3">
                <div className="relative border h-32 w-32 flex flex-col items-center justify-center text-5xl">
                  <AiOutlineCamera />
                  <input
                    type="file"
                    {...register("bannerImage")}
                    onChange={handleBannerImageUpload}
                    accept="image/*"
                    name="image"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    placeholder="Enter number of designers"
                  />
                </div>
                {previewBannerImages.map((image, index) => (
                  <img src={image} className="object-cover h-32 w-32" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg border mb-6 h-72 flex flex-col gap-5">
          <h2 className="font-semibold text-gray-600">Content</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Heading and Description
            </label>
            <ReactQuill
              theme="snow"
              value={descriptionValue}
              onChange={handleDescriptionChange}
              placeholder="e.g. This is a product description"
              className="h-32 mt-1"
            />
          </div>
        </div>

        {/* Meta Details Section */}
        <div className="bg-white p-6 rounded-lg border mb-6 flex flex-col gap-5">
          <h2 className="font-semibold text-gray-600">Meta Details</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <input
                type="text"
                {...register("metaTitle")}
                className="input-box w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                rows="2"
                {...register("metaDescription")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Link
              </label>
              <input
                type="text"
                {...register("metaLink")}
                className="input-box w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Sharing Image
              </label>
              <div className="flex gap-3">
                <div className="relative border h-32 w-32 flex flex-col items-center justify-center text-5xl">
                  <AiOutlineCamera />
                  <input
                    type="file"
                    {...register("socialSharingImage")}
                    onChange={handleSocialImageUpload}
                    accept="image/*"
                    name="image"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    placeholder="Enter number of designers"
                  />
                </div>
                {previewSocialImages.map((image, index) => (
                  <img src={image} className="object-cover h-32 w-32" />
                ))}
              </div>
            </div>
            <TagsInput tags={tags} setTags={setTags} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
