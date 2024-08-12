"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useContext, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableComponent from "@/components/Shared/TableComponent";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useCategory from "@/hooks/useCategory";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AddMenu = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllCategories, CreateCategory, CreateMenu } = useCategory();

  const headers = [
    { label: "", className: "w-[50px]" },
    { label: "Serial", className: "w-[200px]" },
    { label: "Menu" },
    { label: "Date", className: "w-[200px]" },
    { label: "Action", className: "w-[200px]" },
  ];

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const rows = [
    [
      { value: "", className: "" },
      { value: "#001", className: "text-[#2F80ED]", onClick: handleCellClick },
      { value: "Home" },
      { value: "07/11/2021", className: "" },
      { value: "Edit / Delete", className: "", onClick: handleCellClick },
    ],
    [
      { value: "", className: "" },
      { value: "#002", className: "text-[#2F80ED]", onClick: handleCellClick },
      { value: "Mom & Baby" },
      { value: "07/11/2021", className: "" },
      { value: "Edit / Delete", className: "", onClick: handleCellClick },
    ],
    [
      { value: "", className: "" },
      { value: "#003", className: "text-[#2F80ED]", onClick: handleCellClick },
      { value: "Bath & Shower" },
      { value: "07/11/2021", className: "" },
      { value: "Edit / Delete", className: "", onClick: handleCellClick },
    ],
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      const payload = { name: categoryName, storeId: userInfo?.store?._id };
      try {
        const response = await CreateCategory(payload);
        if (response?.success) {
          setCategoryName("");
          fetchCategories();
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      toast.error("Please enter a valid category name");
      console.error("Please enter a valid category name");
    }
  };
  const formRef = useRef(null);

  const handleSubmitForm = async (data) => {
    if (!data.name || !data.type) {
      return toast.error("Please fill all the fields");
    }

    console.log(data);
    const payload = {
      ...data,
      storeId: userInfo?.store?._id,
    };
    const response = await CreateMenu(payload);
    if (response?.success) {
      toast.success("Menu created successfully");
      reset(); // Reset the form
    }
  };

  const menuType = ["Main", "Header", "Footer", "Others"];

  const handleSaveChanges = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Add Menu"
        handleFunction={() => handleSaveChanges()}
        functionTitle="Save Changes"
      />

      <form
        ref={formRef}
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="input-box"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Type</label>
          <Select
            onValueChange={(value) => setValue("type", value)}
            {...register("type", { required: "Type is required" })}
            className="bg-white"
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select a Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {menuType.map((item) => (
                  <SelectItem value={item} className="cursor-pointer">
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type.message}</span>
          )}
        </div>
      </form>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="font-medium">Main Menu list</p>
          <TableComponent headers={headers} rows={rows} />
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Footer list</p>
          <TableComponent headers={headers} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
