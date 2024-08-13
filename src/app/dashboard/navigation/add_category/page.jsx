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
import toast from "react-hot-toast";

const AddCategory = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllCategoriesLevel, CreateCategory } = useCategory();
  const storeId = userInfo?.store?._id;

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

  console.log("categories", categories);

  const headers = [
    { label: "Serial", className: "w-[50px]" },
    { label: "Category", className: "w-[200px]" },
    { label: "Date", className: "w-[200px]" },
    { label: "Action", className: "w-[200px]" },
  ];

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const listCategories =
    (categories?.data?.length > 0 && categories?.data[0]) || [];
  const rows = [];

  console.log("listCategories?.categories", listCategories?.categories);

  if (listCategories?.categories) {
    listCategories.categories.forEach((category, index) => {
      const categoryName = category.name;
      const categoryCreatedAt = formatTime(category?.createdAt);
      const parentCategoryName = category.parentCategory?.name || "";

      if (Array.isArray(category.subcategories)) {
        category.subcategories.forEach((sub, subIndex) => {
          rows.push([
            {
              value: `#${index + 1}.${subIndex + 1}`,
              className: "text-[#2F80ED]",
              onClick: handleCellClick,
            },
            { value: categoryName },
            { value: categoryCreatedAt, className: "" },
            { value: "Edit / Delete", className: "", onClick: handleCellClick },
          ]);
        });
      } else {
        rows.push([
          {
            value: `#${index + 1}`,
            className: "text-[#2F80ED]",
            onClick: handleCellClick,
          },
          { value: categoryName },
          { value: categoryCreatedAt, className: "" },
          { value: "Edit / Delete", className: "", onClick: handleCellClick },
        ]);
      }
    });
  }

  const [selectedValue, setSelectedValue] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      const payload = {
        name: categoryName,
        storeId: userInfo?.store?._id,
        categoryLevel: categories?.data[0]._id,
      };
      try {
        const response = await CreateCategory(payload);
        if (response?.success) {
          setCategoryName("");
          refetchCategory();
          toast.success("Category added successfully");
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      toast.error("Please enter a valid category name");
      console.error("Please enter a valid category name");
    }
  };

  return (
    <div className="flex flex-col">
      <TopActionButtons
        title="Add Category"
        handleFunction={() => handleAddCategory()}
        functionTitle="Save Changes"
      />

      <div className="flex flex-col gap-5 px-10 py-5">
        <span className="flex flex-col gap-1">
          <label htmlFor="">Select Menu</label>
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
          <label htmlFor="">Category Name</label>
          <input
            type="text"
            className="input-box"
            placeholder="Enter Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <p className="font-medium">Category list</p>
          <TableComponent headers={headers} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
