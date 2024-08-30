"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useFileUpload from "@/hooks/UploadFiles/useFileUploadHooks";
import useMoveAssetsSellerHooks from "@/hooks/UploadFiles/useMoveAssetsSellerHooks";
import useStore from "@/hooks/useStore";
import { maxSize, storeId, supportedImageTypes } from "@/libs/utils/common";
import imageRename from "@/libs/utils/imageRename";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const LogoUpdate = () => {
  const router = useRouter();
  const { UpdateStore } = useStore();
  const { userInfo } = useContext(StateContext);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  // const [prevImage, setPrevImage] = useState("");
  const [prevImages, setPrevImages] = useState({
    mainLogo: "",
    invoiceLogo: "",
    navigationLogo: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [previewImageName, setPreviewImageName] = useState("");
  const [previewImage, setPreviewImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const storeInfo = userInfo?.store;
  const storeCloudfrontURL = userInfo?.sellerCloudFrontURL;

  function handleFileSelect(event, logoType) {
    setIsUploading(true);
    let files = Array.from(event.target.files);
    console.log("files", files);
    files = imageRename(files);
    console.log("sanitizedFiles", files);
    const previewImageArray = [];
    const largeFiles = [];
    let lastapproved = null;

    const maxSizeInBytes = maxSize;

    files.forEach((file) => {
      if (!supportedImageTypes.includes(files[0].type)) {
        toast.error(
          "Unsupported image type. Please upload a supported image (JPEG, PNG, GIF, WebP, svg, bmp,,tiff, ico, jp2)."
        );
        return;
      }

      if (file.size < maxSizeInBytes) {
        lastapproved = file;
        setPrevImages((prev) => ({
          ...prev,
          [logoType]: URL.createObjectURL(file),
        }));
        previewImageArray.push(URL.createObjectURL(file));
      } else if (file.size > maxSizeInBytes) {
        largeFiles.push(file);
        toast.error(
          "File size too large. Please upload an image smaller than 4MB."
        );
      }
    });

    console.log("lastapproved", lastapproved, files[0]);
    setIsUploading(true); // Set uploading status to true

    setPreviewImage(previewImageArray);
    console.log("previewImageArray", previewImageArray);

    setSelectedFile([largeFiles?.includes(lastapproved) ? null : lastapproved]);
  }

  useFileUpload(
    selectedFile,
    setImageUploadProgress,
    setPreviewImageName,
    setImageList,
    setIsUploading
  );

  console.log("imageList", imageList);

  const handleUpdateLogo = async (logoType) => {
    console.log("logoType", logoType);
    const images = imageList.map((image) => image.split("/")[2]);

    console.log("images", images);
    const destPathText = `${userInfo?.store?._id}`;

    useMoveAssetsSellerHooks(imageList, destPathText);

    const logoOptions = {};
    if (logoType === "mainLogo") {
      logoOptions.mainLogo = images[0];
    } else if (logoType === "invoiceLogo") {
      logoOptions.invoiceLogo = images[0];
    } else if (logoType === "navigationLogo") {
      logoOptions.navigationLogo = images[0];
    }

    const payload = {
      storeId: userInfo?.store?._id,
      preferences: {
        ...storeInfo?.preferences,
        logoOptions: {
          ...storeInfo?.preferences?.logoOptions,
          ...logoOptions,
        },
      },
    };
    console.log("payload", payload);
    const result = await UpdateStore(payload);

    if (result?.success) {
      toast.success("Logo updated successfully");
      router.push("/dashboard/settings/logo-update");
    }

    console.log("result", result);
  };

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons title={"Logo Update"} />
      <div className="border p-4 flex flex-col gap-3">
        <p>Main Logo</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-3">
            {storeInfo?.preferences?.logoOptions?.mainLogo ? (
              <Image
                src={storeCloudfrontURL?.replace(
                  "*",
                  `${storeInfo?.preferences?.logoOptions?.mainLogo}`
                )}
                className="object-contain w-[234px] h-[51px]"
                width={234}
                height={51}
              />
            ) : (
              prevImages.mainLogo && (
                <Image
                  src={prevImages.mainLogo}
                  alt="profile"
                  className="border-2 border-blue-600 object-contain w-[234px] h-[51px]"
                  width={234}
                  height={51}
                />
              )
            )}
            <div className="primary-btn relative">
              <input
                onChange={(e) => handleFileSelect(e, "mainLogo")}
                accept="image/*"
                type="file"
                name="image"
                className="opacity-0 w-full h-32 absolute cursor-pointer"
                placeholder="Enter number of designers"
              />
              Choose a file
            </div>
            <span> (250px x 120px)</span>
          </div>
          <button
            onClick={() => handleUpdateLogo("mainLogo")}
            type="button"
            className="primary-btn bg-[#219653] hover:bg-[#1d6d40] w-[190px] flex justify-center"
          >
            Save
          </button>
        </div>
      </div>
      <div className="border p-4 flex flex-col gap-3">
        <p>Invoice Logo</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-3">
            {storeInfo?.preferences?.logoOptions?.invoiceLogo ? (
              <Image
                src={storeCloudfrontURL?.replace(
                  "*",
                  `${storeInfo?.preferences?.logoOptions?.invoiceLogo}`
                )}
                className="object-contain w-[234px] h-[51px]"
                width={234}
                height={51}
              />
            ) : (
              prevImages.invoiceLogo && (
                <Image
                  src={prevImages.invoiceLogo}
                  alt="profile"
                  className="border-2 border-blue-600 object-contain w-[234px] h-[51px]"
                  width={234}
                  height={51}
                />
              )
            )}
            <div className="primary-btn relative">
              <input
                onChange={(e) => handleFileSelect(e, "invoiceLogo")}
                accept="image/*"
                type="file"
                name="image"
                className="opacity-0 w-full h-32 absolute cursor-pointer"
                placeholder="Enter number of designers"
              />
              Choose a file
            </div>
            <span> (250px x 120px)</span>
          </div>
          <button
            onClick={() => handleUpdateLogo("invoiceLogo")}
            type="button"
            className="primary-btn bg-[#219653] hover:bg-[#1d6d40] w-[190px] flex justify-center"
          >
            Save
          </button>
        </div>
      </div>
      <div className="border p-4 flex flex-col gap-3">
        <p>Navigation Logo</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-3">
            {storeInfo?.preferences?.logoOptions?.navigationLogo ? (
              <Image
                src={storeCloudfrontURL?.replace(
                  "*",
                  `${storeInfo?.preferences?.logoOptions?.navigationLogo}`
                )}
                className="object-contain w-[234px] h-[51px]"
                width={234}
                height={51}
              />
            ) : (
              prevImages.navigationLogo && (
                <Image
                  src={prevImages.navigationLogo}
                  alt="profile"
                  className="border-2 border-blue-600 object-contain w-[234px] h-[51px]"
                  width={234}
                  height={51}
                />
              )
            )}
            <div className="primary-btn relative">
              <input
                onChange={(e) => handleFileSelect(e, "navigationLogo")}
                // onChange={handleFileSelect}
                accept="image/*"
                type="file"
                name="image"
                className="opacity-0 w-full h-32 absolute cursor-pointer"
                placeholder="Enter number of designers"
              />
              Choose a file
            </div>
            <span> (250px x 120px)</span>
          </div>
          <button
            onClick={() => handleUpdateLogo("navigationLogo")}
            type="button"
            className="primary-btn bg-[#219653] hover:bg-[#1d6d40] w-[190px] flex justify-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoUpdate;
