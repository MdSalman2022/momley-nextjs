"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useContext, useEffect, useState } from "react";
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

const AddSubSubCategory = () => {
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

  const allCategories = categories.data;
  const allSubSubCategories = categories.data
    ?.flatMap((cat) => cat.subcategories)
    ?.filter((sub) => sub?.level === 3);

  console.log("allCategories", allCategories);
  console.log("allSubSubCategories", allSubSubCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subsubCategoryName, setSubSubCategoryName] = useState("");
  const [allSubcategories, setAllSubcategories] = useState([]);

  console.log("allSubcategories", allSubcategories);

  useEffect(() => {
    if (selectedCategory) {
      const subCategories = categories?.data?.find(
        (cat) => selectedCategory === cat._id
      ).subcategories;
      console.log("subCategories", subCategories);
      setAllSubcategories(subCategories);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory) {
      const subCategories = allSubcategories?.filter(
        (cat) => selectedSubCategory === cat._id
      );

      setAllSubcategories(subCategories);
    }
  }, [selectedSubCategory]);

  console.log("categories", categories);

  const headers = [
    { label: "", className: "w-[50px]" },
    { label: "Serial", className: "w-[100px]" },
    { label: "Category" },
    { label: "Sub Category", className: "w-[200px]" },
    { label: "Sub Sub Category", className: "w-[200px]" },
    { label: "Date", className: "w-[200px]" },
    { label: "Action", className: "w-[200px]" },
  ];

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const rows = [];

  (Array.isArray(allCategories) ? allCategories : []).forEach(
    (category, index) => {
      if (
        Array.isArray(category.subcategories) &&
        category.subcategories.length > 0
      ) {
        category.subcategories.forEach((sub, subIndex) => {
          if (
            Array.isArray(sub.subcategories) &&
            sub.subcategories.length > 0
          ) {
            sub.subcategories.forEach((subSub, subSubIndex) => {
              rows.push([
                { value: "", className: "" },
                {
                  value: `#${index + 1}.${subIndex + 1}.${subSubIndex + 1}`,
                  className: "text-[#2F80ED]",
                  onClick: handleCellClick,
                },
                { value: category.name },
                { value: sub.name },
                { value: subSub.name },
                { value: formatTime(category?.createdAt), className: "" },
                {
                  value: "Edit / Delete",
                  className: "",
                  onClick: handleCellClick,
                },
              ]);
            });
          } else {
            rows.push([
              { value: "", className: "" },
              {
                value: `#${index + 1}.${subIndex + 1}`,
                className: "text-[#2F80ED]",
                onClick: handleCellClick,
              },
              { value: category.name },
              { value: sub.name },
              { value: "", className: "" },
              { value: formatTime(category?.createdAt), className: "" },
              {
                value: "Edit / Delete",
                className: "",
                onClick: handleCellClick,
              },
            ]);
          }
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
          { value: "", className: "" },
          { value: formatTime(category?.createdAt), className: "" },
          { value: "Edit / Delete", className: "", onClick: handleCellClick },
        ]);
      }
    }
  );

  const handleAddSubCategory = async () => {
    if (subsubCategoryName.trim() && selectedCategory) {
      const payload = {
        name: subsubCategoryName,
        storeId: userInfo?.store?._id,
        parentCategory: selectedSubCategory,
      };
      try {
        const response = await CreateCategory(payload);
        if (response?.success) {
          setSubSubCategoryName("");
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
          <Select onValueChange={() => console.log("test")}>
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
          <Select onValueChange={(value) => setSelectedCategory(value)}>
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
            Select Sub Category
          </label>
          <Select onValueChange={(value) => setSelectedSubCategory(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allSubcategories?.length > 0 &&
                  allSubcategories?.map((category) => (
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
            Category Name
          </label>
          <input
            type="text"
            className="input-box"
            placeholder="Enter Name"
            onChange={(e) => setSubSubCategoryName(e.target.value)}
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

export default AddSubSubCategory;
