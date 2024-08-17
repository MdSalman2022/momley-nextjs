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
import { quantityType, units } from "@/libs/utils/common";
import TagsInput from "@/libs/utils/tagsInput";
import SelectCategoryModal from "@/libs/utils/SelectCategoryModal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProductModal = () => {
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

  const { createProduct } = useProduct();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

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

  const handleQuantityTypeValue = (value) => {
    setValue("quantityType", value, { shouldValidate: true });
  };

  const handleValueChange = (value) => {
    setValue("unit", value, { shouldValidate: true });
  };
  const onSubmit = async (data) => {
    if (!selectedSubCategory?.id) {
      toast.error("Please select a category");
      return;
    }
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
    const payload = {
      name: name,
      description: description,
      price: price,
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
              <div className="flex flex-col mb-5">
                <label className="text-sm" htmlFor="description">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                  placeholder="e.g. This is a product description"
                />
                {/* <textarea
                  className="input-box border-[#11111170] h-20 py-1"
                  {...register("description", { required: true })}
                  placeholder="e.g. This is a product description"
                /> */}
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
                <div className="h-52 rounded-lg flex items-center justify-center border-2 border-dashed p-5">
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
                    {units.map((option, index) => (
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
                {/* {!selectedSubCategory?.id && (
            <span className="text-xs text-red-600">This field is required</span>
          )} */}
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
              {/* <div className="flex flex-col">
                <label className="text-sm" htmlFor="tags">
                  Tags
                </label>
                <input
                  type="text"
                  className="input-box"
                  {...register("tags", { required: false })}
                />
              </div> */}
              <TagsInput tags={tags} setTags={setTags} />
            </div>
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
