"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useContext, useState } from "react";
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
import { useQuery } from "react-query";
import { formatTime } from "@/libs/utils/common";

const AddCategory = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllCategories, CreateCategory } = useCategory();

  const {
    data: categories = {},
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["catagories"],
    queryFn: () => getAllCategories(),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("categories", categories);

  const headers = [
    { label: "", className: "w-[50px]" },
    { label: "Serial", className: "w-[100px]" },
    { label: "Category" },
    { label: "Sub Category", className: "w-[200px]" },
    { label: "Date", className: "w-[200px]" },
    { label: "Action", className: "w-[200px]" },
  ];

  const allSubcategories = categories.data;

  console.log("allSubcategories", allSubcategories);

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const rows = [];

  (Array.isArray(allSubcategories) ? allSubcategories : []).forEach(
    (category, index) => {
      if (Array.isArray(category.subcategories)) {
        category.subcategories.forEach((sub, subIndex) => {
          rows.push([
            { value: "", className: "" },
            {
              value: `#${index + 1}.${subIndex + 1}`,
              className: "text-[#2F80ED]",
              onClick: handleCellClick,
            },
            { value: category.name },
            { value: sub.name },
            { value: formatTime(category?.createdAt), className: "" },
            { value: "Edit / Delete", className: "", onClick: handleCellClick },
          ]);
        });
      } else {
        rows.push([
          { value: "", className: "" },
          {
            value: `#${index + 1}`,
            className: "text-[#2F80ED]",
            onClick: handleCellClick,
          },
          { value: category.name },
          { value: "", className: "" },
          { value: formatTime(category?.createdAt), className: "" },
          { value: "Edit / Delete", className: "", onClick: handleCellClick },
        ]);
      }
    }
  );

  const [selectedValue, setSelectedValue] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleAddSubCategory = async () => {
    if (categoryName.trim() && selectedValue) {
      const payload = {
        name: categoryName,
        storeId: userInfo?.store?._id,
        parentCategory: selectedValue,
      };
      try {
        const response = await CreateCategory(payload);
        if (response?.success) {
          setCategoryName("");
          refetchCategory();
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      toast.error("Please enter a valid sub category name");
      console.error("Please enter a valid category name");
    }
  };

  return (
    <div className="flex flex-col">
      <TopActionButtons
        title="Add Sub-Category"
        handleFunction={() => handleAddSubCategory()}
        functionTitle="Save Changes"
      />

      <div className="flex flex-col gap-5 px-10 py-5">
        <span className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm">
            Select Menu
          </label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="main">Main Menu</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <span className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm">
            Select Category
          </label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories?.data?.length > 0 &&
                  categories?.data?.map((category) => (
                    <SelectItem value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <span className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm">
            Sub Category Name
          </label>
          <input
            type="text"
            className="input-box"
            placeholder="Enter Name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="font-medium">Sub Category list</p>
          <TableComponent headers={headers} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
