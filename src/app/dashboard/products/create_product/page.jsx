"use client";
import React, { useContext, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import useProduct from "@/hooks/useProduct";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import {
  getUnitsByType,
  maxSize,
  quantityType,
  supportedImageTypes,
  units,
} from "@/libs/utils/common";
import TagsInput from "@/libs/utils/tagsInput";
import SelectCategoryModal from "@/libs/utils/SelectCategoryModal";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { waitUntilSymbol } from "next/dist/server/web/spec-extension/fetch-event";
import useFileUpload from "@/hooks/UploadFiles/useFileUploadHooks";
import imageRename from "@/libs/utils/imageRename";
import useMoveAssetsSellerHooks from "@/hooks/UploadFiles/useMoveAssetsSellerHooks";
import Image from "next/image";

const CreateProductModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [previewImageName, setPreviewImageName] = useState("");
  const [imageList, setImageList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const router = useRouter();
  const { userInfo } = useContext(StateContext);
  const [descriptionValue, setDescriptionValue] = useState("");
  const formRef = useRef(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    id: null,
    name: null,
    ancestors: [],
  });

  console.log("descriptionValue", descriptionValue);
  const [tags, setTags] = useState([]);

  const inputRef = useRef();

  const { createProduct } = useProduct();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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

      const supportedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml", // SVG
        "image/bmp", // BMP
        "image/tiff", // TIFF
        "image/x-icon", // ICO
        "image/jp2", // JPEG 2000
      ];

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

  console.log("previewImages", previewImages);
  console.log("imageList", imageList);

  const [specifications, setSpecifications] = useState([]);
  const [newSpecName, setNewSpecName] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [showNewSpecFields, setShowNewSpecFields] = useState(
    specifications.length === 0
  );

  const addSpecification = () => {
    if (newSpecName && newSpecValue) {
      setSpecifications([
        ...specifications,
        { name: newSpecName, value: newSpecValue },
      ]);
      setNewSpecName("");
      setNewSpecValue("");
      setShowNewSpecFields(false);
    }
  };

  console.log("specifications", specifications);

  const handleDescriptionChange = (value) => {
    console.log("value", value);
    setDescriptionValue(value);
    setValue("description", value, { shouldValidate: true });
  };

  console.log("descriptionValue", descriptionValue);
  const [typeUnit, setTypeUnit] = useState(units);

  const handleQuantityTypeValue = (value) => {
    setValue("quantityType", value, { shouldValidate: true });

    const updatedUnits = getUnitsByType(value);
    setTypeUnit(updatedUnits);
  };

  const handleValueChange = (value) => {
    setValue("unit", value, { shouldValidate: true });
  };
  const onSubmit = async (data) => {
    if (!selectedSubCategory?.id) {
      toast.error("Please select a category");
      return;
    }

    /*    if (specifications?.length === 0) {
      toast.error("Please add specifications");
      return;
    } */

    // Handle form submission with validated data
    console.log("data", data);
    const {
      name,
      color,
      description,
      price,
      salePrice,
      quantity,
      quantityType,
      weight,
      unit,
      brand,
      specifications,
    } = data;

    const images = imageList.map((image) => image.split("/")[2]);

    const destPathText = `${userInfo?.store?._id}/products`;

    useMoveAssetsSellerHooks(imageList, destPathText);

    const payload = {
      name: name,
      description: description,
      price: price,
      images: images,
      salePrice: salePrice,
      stock: {
        inStock: true,
        quantity: quantity,
        quantityType: quantityType,
        quantityInStock: quantity,
      },
      weight: weight,
      color: color,
      unit: unit,
      store: userInfo?.store?._id,
      category: selectedSubCategory?.id,
      ancestors: selectedSubCategory?.ancestors,
      specifications,
      tags,
      brand,
    };
    console.log("payload", payload);
    const result = await createProduct(payload);

    if (result?.success) {
      toast.success("Product created successfully");
      router.push("/dashboard/products");
    }

    console.log("result", result);
  };

  console.log("selectedSubCategory", selectedSubCategory);

  const handleSaveChanges = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <div>
      {isCategoryModalOpen && (
        <SelectCategoryModal
          isOpen={isCategoryModalOpen}
          setIsOpen={setIsCategoryModalOpen}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      )}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Create Product</h2>
          <button
            onClick={() => handleSaveChanges()}
            type="button"
            className="primary-btn"
          >
            Create Product
          </button>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-3 gap-5 bg-white rounded-xl pb-5"
        >
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex flex-col gap-3 border pt-4 pb-5 px-4 rounded-lg">
              <label className="text-sm tracking-wide font-medium text-slate-400">
                PRODUCT
              </label>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="name">
                  Product Name
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="e.g. Apple iPhone 12"
                />
                {errors.name && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-10">
                <label className="text-sm" htmlFor="description">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                  placeholder="e.g. This is a product description"
                />
                {errors.description && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm" htmlFor="description">
                  Media
                </label>
                <div className="flex">
                  {previewImages?.length > 0 &&
                    previewImages?.map((item, index) => (
                      <div className="bg-black rounded-lg bg-opacity-5 w-fit p-1 relative">
                        <div className="flex flex-col justify-center items-center h-full w-full">
                          <Image src={item} alt="" width={128} height={128} />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="h-52 rounded-lg flex items-center justify-center border-2 border-dashed p-5 relative">
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
                  <div className="flex flex-col items-center">
                    <div className="text-2xl">
                      <MdOutlineFileUpload />
                    </div>
                    <span className="font-semibold text-sm">
                      Drag drop some files here, or click to select files
                    </span>
                    <span className="text-xs text-slate-400">
                      * 1080 x 1080 (1:1) recommended, up to 2MB each
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border pt-4 pb-5 px-4 rounded-lg">
              <label className="text-sm tracking-wide font-medium text-slate-400 col-span-2">
                PRICING
              </label>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="price">
                  Price
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="price"
                  type="number"
                  placeholder="e.g. 100"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="price">
                  Sale Price
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="salePrice"
                  type="number"
                  placeholder="e.g. 100"
                  {...register("salePrice", { required: true })}
                />
                {errors.salePrice && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="quantity"
                  type="number"
                  placeholder="e.g. 10"
                  {...register("quantity", { required: true })}
                />
                {errors.quantity && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm" htmlFor="weight">
                  Weight
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="e.g. 0.5"
                  {...register("weight", { required: true })}
                />
                {errors.weight && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="quantity">
                  Quantity Type
                </label>
                <Select onValueChange={handleQuantityTypeValue} filterable>
                  <SelectTrigger className="w-full h-10 mt-1 border-[#11111170]">
                    <SelectValue
                      placeholder="Select Quantity Type"
                      {...register("quantityType", { required: true })}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {quantityType.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.quantity && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="unit">
                  Unit
                </label>
                <Select onValueChange={handleValueChange} filterable>
                  <SelectTrigger className="w-full h-10 mt-1 border-[#11111170]">
                    <SelectValue
                      placeholder="Select Unit"
                      {...register("unit", { required: true })}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {typeUnit.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.unit && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <div className="border rounded-lg pt-3 pb-5 px-4 flex flex-col gap-3 h-fit">
              <label className="text-sm tracking-wide font-medium text-slate-400">
                CATEGORIZATION
              </label>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="category">
                  Category
                </label>
                <span
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="input-box border-[#11111170] cursor-pointer"
                >
                  {selectedSubCategory?.name
                    ? selectedSubCategory?.name
                    : "Select Category"}
                </span>
              </div>

              <div className="flex flex-col">
                <label className="text-sm" htmlFor="brand">
                  Brand
                </label>
                <input
                  type="text"
                  className="input-box"
                  {...register("brand", { required: false })}
                  placeholder="e.g. Apple"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="color">
                  Color
                </label>
                <input
                  className="input-box border-[#11111170]"
                  id="color"
                  type="text"
                  placeholder="e.g Black"
                  {...register("color", { required: false })}
                />
                {errors.color && (
                  <span className="text-xs text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <TagsInput tags={tags} setTags={setTags} />
            </div>
            {selectedSubCategory?.name == "Book" && (
              <div className="flex flex-col gap-3 border rounded-lg pt-3 pb-5 px-4">
                <label className="text-sm tracking-wide font-medium text-slate-400">
                  BOOK SPECIFICATION
                </label>
                <div className="flex flex-col gap-1">
                  <label className="text-sm" htmlFor={`specifications.author`}>
                    Author
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id={`specifications.author`}
                    {...register(`specifications.author`, {
                      required: true,
                    })}
                  />
                  {errors.specifications?.author && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm" htmlFor={`specifications.author`}>
                    Edition
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id={`specifications.edition`}
                    {...register(`specifications.edition`, {
                      required: false,
                    })}
                  />
                  {errors.specifications?.edition && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm" htmlFor={`specifications.author`}>
                    Book Length
                  </label>
                  <input
                    className="input-box border-[#11111170]"
                    id={`specifications.bookLength`}
                    {...register(`specifications.bookLength`, {
                      required: false,
                    })}
                  />
                  {errors.specifications?.bookLength && (
                    <span className="text-xs text-red-600">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 border rounded-lg pt-3 pb-5 px-4">
              <label className="text-sm tracking-wide font-medium text-slate-400">
                SPECIFICATION
              </label>
              <div className="flex flex-col gap-5">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <label
                      className="text-sm"
                      htmlFor={`specifications.${spec.name}`}
                    >
                      {spec.name}
                    </label>
                    <input
                      className="input-box border-[#11111170]"
                      id={`specifications.${spec.name}`}
                      {...register(`specifications.${spec.name}`, {
                        required: true,
                      })}
                      defaultValue={spec.value}
                    />
                    {errors.specifications?.[spec.name] && (
                      <span className="text-xs text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                ))}
                {showNewSpecFields && (
                  <>
                    <div className="flex flex-col">
                      <label className="text-sm" htmlFor="newSpecName">
                        New Specification Name
                      </label>
                      <input
                        className="input-box border-[#11111170]"
                        id="newSpecName"
                        value={newSpecName}
                        placeholder="e.g. RAM"
                        onChange={(e) => setNewSpecName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm" htmlFor="newSpecValue">
                        New Specification Value
                      </label>
                      <input
                        className="input-box border-[#11111170]"
                        id="newSpecValue"
                        value={newSpecValue}
                        placeholder="e.g. 4GB"
                        onChange={(e) => setNewSpecValue(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="primary-btn justify-center"
                      onClick={addSpecification}
                    >
                      Add Specification
                    </button>
                  </>
                )}
                {!showNewSpecFields && (
                  <button
                    type="button"
                    className="primary-outline-btn justify-center gap-2"
                    onClick={() => setShowNewSpecFields(true)}
                  >
                    <div className="text-xl">
                      <FiPlusCircle />
                    </div>
                    Add Another
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
