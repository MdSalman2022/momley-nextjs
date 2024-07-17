import React, { useState } from "react";
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

const CreateProductModal = ({ isOpen, setIsOpen }) => {
  const { createProduct } = useProduct();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const units = ["KG", "LBS"];

  const [selectedStatus, setSelectedStatus] = useState("Active");
  const handleValueChange = (value) => {
    setValue("unit", value, { shouldValidate: true });
  };
  const onSubmit = (data) => {
    // Handle form submission with validated data
    console.log("data", data);
    const payload = {
      name: "Laptop",
      description: "A high-end gaming laptop",
      price: 1500,
      quantity: 10,
      weight: 2.5,
      unit: "kg",
      store: "60c72b2f9b1d8b002d35e0e8",
      category: "66966a694bd58ec6ee1c9993",
      specifications: {
        processor: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        graphics: "NVIDIA GTX 1650",
      },
    };
    const result = createProduct(payload);

    console.log("result", result);
  };

  return (
    <ModalBox isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
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
          {errors.name && <span>This field is required</span>}
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
          {errors.description && <span>This field is required</span>}
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
          {errors.price && <span>This field is required</span>}
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
          {errors.quantity && <span>This field is required</span>}
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
          {errors.weight && <span>This field is required</span>}
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
          {errors.unit && <span>This field is required</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="category">
            Category
          </label>
          <input
            className="input-box border-[#11111170]"
            id="category"
            {...register("category", { required: true })}
          />
          {errors.category && <span>This field is required</span>}
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
                <span>This field is required</span>
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
                <span>This field is required</span>
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
                <span>This field is required</span>
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
                <span>This field is required</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-start col-span-2 gap-2">
          <button
            className="primary-outline-btn"
            onClick={() => setIsOpen(false)}
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
