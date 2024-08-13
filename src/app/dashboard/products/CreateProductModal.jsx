import React, { useContext, useState } from "react";
import ModalBox from "@/components/Shared/ModalBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import useProduct from "@/hooks/useProduct";
import SelectCategoryModal from "./SelectCategoryModal";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import toast from "react-hot-toast";

const CreateProductModal = ({ isOpen, setIsOpen, refetchProducts }) => {
  const { userInfo } = useContext(StateContext);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    id: null,
    name: null,
  });

  const { createProduct } = useProduct();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const units = ["KG", "LBS"];

  const [selectedStatus, setSelectedStatus] = useState("Active");
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
    const { name, description, price, quantity, weight, unit, specifications } =
      data;
    const payload = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      weight: weight,
      unit: unit,
      store: userInfo?.store?._id,
      category: selectedSubCategory?.id,
      specifications,
    };
    console.log("payload", payload);
    const result = await createProduct(payload);

    if (result?.success) {
      toast.success("Product created successfully");
      refetchProducts();
      setIsOpen(false);
    }

    console.log("result", result);
  };

  console.log("selectedSubCategory", selectedSubCategory);

  return (
    <ModalBox isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
      {isCategoryModalOpen && (
        <SelectCategoryModal
          isOpen={isCategoryModalOpen}
          setIsOpen={setIsCategoryModalOpen}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 gap-5 px-10 py-6 bg-white rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="name">
            Name
          </label>
          <input
            className="input-box border-[#11111170]"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="description">
            Description
          </label>
          <input
            className="input-box border-[#11111170]"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="price">
            Price
          </label>
          <input
            className="input-box border-[#11111170]"
            id="price"
            type="number"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="input-box border-[#11111170]"
            id="quantity"
            type="number"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="weight">
            Weight
          </label>
          <input
            className="input-box border-[#11111170]"
            id="weight"
            type="number"
            step="0.1"
            {...register("weight", { required: true })}
          />
          {errors.weight && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div>
          <label className="text-sm" htmlFor="unit">
            Unit
          </label>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-full h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
              <SelectValue
                placeholder="Select unit"
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
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2">
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
          {!selectedSubCategory?.id && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
        <div className="col-span-2">
          <label className="font-semibold">Specifications</label>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="processor">
                Processor
              </label>
              <input
                className="input-box border-[#11111170]"
                id="processor"
                {...register("specifications.processor", { required: true })}
              />
              {errors.specifications?.processor && (
                <span className="text-xs text-red-600">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="ram">
                RAM
              </label>
              <input
                className="input-box border-[#11111170]"
                id="ram"
                {...register("specifications.ram", { required: true })}
              />
              {errors.specifications?.ram && (
                <span className="text-xs text-red-600">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="storage">
                Storage
              </label>
              <input
                className="input-box border-[#11111170]"
                id="storage"
                {...register("specifications.storage", { required: true })}
              />
              {errors.specifications?.storage && (
                <span className="text-xs text-red-600">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="graphics">
                Graphics
              </label>
              <input
                className="input-box border-[#11111170]"
                id="graphics"
                {...register("specifications.graphics", { required: true })}
              />
              {errors.specifications?.graphics && (
                <span className="text-xs text-red-600">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start col-span-2 gap-2">
          <button
            className="primary-outline-btn"
            onClick={() => {
              reset();
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </ModalBox>
  );
};

export default CreateProductModal;
