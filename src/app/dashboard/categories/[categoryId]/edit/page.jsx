"use client";
import HeadlessModalBox from "@/components/Shared/HeadlessModalBox";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useFileUpload from "@/hooks/UploadFiles/useFileUploadHooks";
import useMoveAssetsSellerHooks from "@/hooks/UploadFiles/useMoveAssetsSellerHooks";
import useCategory from "@/hooks/useCategory";
import useProduct from "@/hooks/useProduct";
import { handleFilesSelect, storeId } from "@/libs/utils/common";
import TagsInput from "@/libs/utils/tagsInput";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { useQuery } from "react-query";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Checkbox } from "@/components/ui/checkbox";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CategoryDetailsEdit = ({ params }) => {
  const { userInfo, storeInfo } = useContext(StateContext);
  const { UpdateCategory, getCategoryBySlug } = useCategory();

  const [tags, setTags] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  console.log("params?.categoryId", params?.categoryId, storeId);
  const {
    data: CategoryDetails = {},
    isLoading: isCategoryDetailsLoading,
    refetch: refetchCategoryDetails,
  } = useQuery({
    queryKey: ["CategoryDetails", storeId, params?.categoryId],
    queryFn: () => getCategoryBySlug(storeId, 5, params?.categoryId),
  });

  console.log("CategoryDetails", CategoryDetails);

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

  console.log("previewImages", previewImages);

  useEffect(() => {
    console.log("previewImages", previewImages);
    if (CategoryDetails?.data) {
      reset({
        categoryName: CategoryDetails?.data?.name,
        description: CategoryDetails?.data?.description,
        metaTitle: CategoryDetails?.data?.seoProperties?.metaTitle,
        metaDescription: CategoryDetails?.data?.seoProperties?.metaDescription,
        metaLink: CategoryDetails?.data?.seoProperties?.metaLink,
      });
      setDescriptionValue(CategoryDetails?.data?.description);
      setPreviewImages(
        CategoryDetails?.data?.image ? [CategoryDetails?.data?.image] : []
      );
      setPreviewBannerImages(
        CategoryDetails?.data?.bannerImages?.webImage
          ? [CategoryDetails?.data?.bannerImages?.webImage]
          : []
      );
      setPreviewSocialImages(
        CategoryDetails?.data?.seoProperties?.metaImage
          ? [CategoryDetails?.data?.seoProperties?.metaImage]
          : []
      );
      setTags(CategoryDetails?.data?.tags);
      setSelectedProducts(CategoryDetails?.data?.products?.map((p) => p));
    }
  }, [CategoryDetails, reset]);

  console.log("products", CategoryDetails?.data?.products);

  const handleDescriptionChange = (value) => {
    console.log("value", value);
    setDescriptionValue(value);
    setValue("description", value, { shouldValidate: true });
  };

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
  const { GetProducts } = useProduct();

  const [searchText, setSearchText] = useState("");

  const {
    data: allProducts = {},
    isLoading: isProductLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["allProducts", searchText],
    queryFn: () => GetProducts(searchText),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  console.log("allProducts", allProducts);

  /*   const {
    data: categories = {},
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categories", storeId],
    queryFn: () => storeId && getAllCategoriesLevel(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  }); */

  const getChangedFields = (originalData, currentData) => {
    const changedFields = {};

    for (const key in currentData) {
      if (currentData[key] !== originalData[key]) {
        changedFields[key] = currentData[key];
      }
    }

    return changedFields;
  };

  const onSubmit = async (data) => {
    console.log("data", data);

    const images = imageList?.map((image) => image.split("/")[2]) || [];
    const bannerImages =
      BannerImageList?.map((image) => image.split("/")[2]) || [];
    const metaImage =
      SocialImageList?.map((image) => image.split("/")[2]) || [];

    // Handle form submission
    const originalData = {
      id: CategoryDetails?.data?._id,
      name: CategoryDetails?.data?.name,
      description: CategoryDetails?.data?.description,
      image: CategoryDetails?.data?.image,
      products: CategoryDetails?.data?.products || [],
      bannerImages: {
        webImage: CategoryDetails?.data?.bannerImages?.webImage,
      },
      seoProperties: {
        metaTitle: CategoryDetails?.data?.seoProperties?.metaTitle,
        metaDescription: CategoryDetails?.data?.seoProperties?.metaDescription,
        metaLink: CategoryDetails?.data?.seoProperties?.metaLink,
        metaImage: CategoryDetails?.data?.seoProperties?.metaImage,
      },
    };

    const currentData = {
      id: CategoryDetails?.data?._id,
      name: data?.categoryName,
      description: data?.description,
      image: images.length > 0 ? images[0] : CategoryDetails?.data?.image,
      bannerImages: {
        webImage:
          bannerImages.length > 0
            ? bannerImages[0]
            : CategoryDetails?.data?.bannerImages?.webImage,
      },
      products: selectedProducts?.map((p) => p._id) || [],
      seoProperties: {
        metaTitle: data?.metaTitle,
        metaDescription: data?.metaDescription,
        metaLink: data?.metaLink,
        metaImage:
          metaImage.length > 0
            ? metaImage[0]
            : CategoryDetails?.data?.seoProperties?.metaImage,
      },
    };

    let payload = getChangedFields(originalData, currentData);

    console.log("payload", payload);

    payload = {
      id: CategoryDetails?.data?._id,
      ...payload,
    };

    const destPathText = `${userInfo?.store?._id}/categories`;

    const allImages = [...imageList, ...BannerImageList, ...SocialImageList];

    if (allImages.length > 0) {
      useMoveAssetsSellerHooks(allImages, destPathText);
    }

    try {
      const response = await UpdateCategory(payload, payload?.id);
      console.log("response", response);
      if (response?.success) {
        console.log("Category added successfully");
        toast.success("Category added successfully");
        router.push("/dashboard/categories");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const cloudFrontURL = CategoryDetails?.data?.cloudFrontURL;

  const [isSelectProductModalOpen, setIsSelectProductModalOpen] =
    useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  console.log("selectedProducts", selectedProducts);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.some((p) => p._id === product._id)
        ? prevSelectedProducts.filter((p) => p._id !== product._id)
        : [...prevSelectedProducts, product]
    );
  };

  const productCloudfrontUrl = storeInfo?.cloudFrontURL;

  return (
    <div className="container mx-auto p-6">
      <HeadlessModalBox
        isOpen={isSelectProductModalOpen}
        setIsOpen={setIsSelectProductModalOpen}
        title="Select Product"
      >
        <div className="flex flex-col overflow-y-auto max-h-[700px] px-6 pb-4 scrollbar-thin relative">
          <input
            type="text"
            placeholder="Search products"
            value={searchText}
            onChange={handleSearchChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <ul className="space-y-4 mb-14">
            {isProductLoading ? (
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex gap-3">
                  <div className="h-12 w-12 bg-gray-300 animate-pulse rounded-lg"></div>
                  <div className="flex flex-col gap-1">
                    <span className="w-20 bg-gray-300 animate-pulse h-4"></span>
                    <span className="w-10 bg-gray-300 animate-pulse h-4"></span>
                  </div>
                </div>
                <div className="h-5 w-5 bg-gray-300 animate-pulse"></div>
              </div>
            ) : (
              allProducts?.products?.map((product) => (
                <li
                  key={product._id}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex items-center">
                    <Image
                      src={productCloudfrontUrl?.replace(
                        "*",
                        `products/${product?.images[0]}`
                      )}
                      alt={product.name}
                      className="w-12 h-12 mr-4"
                      width={50}
                      height={50}
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-500">${product.salePrice}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedProducts.some(
                      (p) => p._id === product._id
                    )}
                    onCheckedChange={(value) => handleCheckboxChange(product)}
                    aria-label="Select all"
                  />
                  {/*         <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleCheckboxChange(product._id)}
                    /> */}
                </li>
              ))
            )}
          </ul>
          <div className="fixed bottom-0 left-0 h-14 flex items-center justify-center bg-[#e5e5e5] w-full px-4 border-t border-gray-300">
            <button
              onClick={() => setIsSelectProductModalOpen(false)}
              type="button"
              className="primary-btn"
            >
              Save
            </button>
          </div>
        </div>
      </HeadlessModalBox>
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Category</h1>
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
                {previewImages?.length > 0 &&
                  previewImages?.map((image, index) => (
                    <img
                      src={cloudFrontURL?.replace("*", `categories/${image}`)}
                      className="object-cover h-32 w-32"
                    />
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
                {previewBannerImages?.length > 0 &&
                  previewBannerImages?.map((image, index) => (
                    <img
                      src={cloudFrontURL?.replace("*", `categories/${image}`)}
                      className="object-cover h-32 w-32"
                    />
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

        {/* subcategory list */}
        <div className="bg-white p-6 rounded-lg border mb-6">
          <h2 className="font-bold pb-2 border-b">Subcategories</h2>

          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto scrollbar-thin">
            {CategoryDetails?.data?.subcategories?.length > 0 &&
              CategoryDetails?.data?.subcategories?.map(
                (subcategory, index) => (
                  <div
                    key={subcategory?._id}
                    className="border p-4 rounded-lg flex items-center justify-between gap-2"
                  >
                    <p className="text-sm">{subcategory?.name}</p>
                    <BiDotsVerticalRounded />
                  </div>
                )
              )}
          </div>

          <div className="flex flex-col items-center justify-center h-32 gap-3">
            {CategoryDetails?.data?.subcategories?.length < 1 && (
              <p className="text-center">
                Select products to show inside this category
              </p>
            )}
            <button
              onClick={() => setIsSelectProductModalOpen(true)}
              type="button"
              className="primary-outline-btn text-sm"
            >
              Add Subcategory
            </button>
          </div>
        </div>
        {/* Products List Section */}
        <div className="bg-white p-6 rounded-lg border mb-6">
          <h2 className="font-bold pb-2 border-b">Products List</h2>
          {/* Add your products list here */}
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto scrollbar-thin">
            {selectedProducts?.length > 0 &&
              selectedProducts?.map((product, index) => (
                <div className="border p-4 rounded-lg flex items-center gap-2">
                  <Image
                    src={cloudFrontURL?.replace(
                      "*",
                      `products/${product?.images[0]}`
                    )}
                    width={50}
                    height={50}
                  />
                  <p>{product?.name}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col items-center justify-center h-32 gap-3">
            {CategoryDetails?.data?.products?.length < 1 && (
              <p className="text-center">
                Select products to show inside this category
              </p>
            )}
            <button
              onClick={() => setIsSelectProductModalOpen(true)}
              type="button"
              className="primary-outline-btn text-sm"
            >
              Select products
            </button>
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
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                {previewSocialImages?.length > 0 &&
                  previewSocialImages?.map((image, index) => (
                    <img
                      src={cloudFrontURL?.replace("*", `categories/${image}`)}
                      className="object-cover h-32 w-32"
                    />
                  ))}
              </div>
            </div>
            {tags && <TagsInput tags={tags} setTags={setTags} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryDetailsEdit;
