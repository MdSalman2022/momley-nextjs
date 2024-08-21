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
  const { getAllCategoriesLevel, CreateCategory, GetMenus, DeleteCategory } =
    useCategory();
  const storeId = userInfo?.store?._id;
  const {
    data: getMenus = {},
    isLoading: isMenuLoading,
    refetch: refetchMenu,
  } = useQuery({
    queryKey: ["getMenus", storeId],
    queryFn: () => storeId && GetMenus(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  console.log("getMenus", getMenus);

  const allMenus =
    !isMenuLoading &&
    getMenus?.data?.map((menu) => {
      return {
        label: menu.name,
        value: menu._id,
        position: menu?.position,
      };
    });

  console.log("allMenusallMenus", allMenus);

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

      const handleEditClick = () => {
        // Your edit logic here
        console.log(`Edit category: ${categoryName}`);
      };

      const handleDeleteClick = async () => {
        // Your delete logic here
        console.log(`Delete category: ${category._id}`);
        const response = await DeleteCategory(category._id);
        console.log("response", response);
        if (response?.success) {
          refetchCategory();
          toast.success("Category deleted successfully");
        }
      };

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
            {
              value: (
                <div className="flex gap-2">
                  <button onClick={handleEditClick} className="text-blue-500">
                    Edit
                  </button>
                  <button onClick={handleDeleteClick} className="text-red-500">
                    Delete
                  </button>
                </div>
              ),
              className: "",
            },
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
          {
            value: (
              <div className="flex gap-2">
                <button onClick={handleEditClick} className="text-blue-500">
                  Edit
                </button>
                <button onClick={handleDeleteClick} className="text-red-500">
                  Delete
                </button>
              </div>
            ),
            className: "",
          },
        ]);
      }
    });
  }

  const [selectedMenuValue, setSelectedMenuValue] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSelectMenuChange = (value) => {
    setSelectedMenuValue(value);
  };

  console.log("selectedMenuValue", selectedMenuValue);

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      const payload = {
        name: categoryName,
        storeId: userInfo?.store?._id,
        categoryLevel: categories?.data[0]._id,
        menuId: selectedMenuValue || "",
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
          <Select onValueChange={handleSelectMenuChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allMenus?.length > 0 &&
                  allMenus?.map((menu) => (
                    <SelectItem key={menu.value} value={menu.value}>
                      {menu.label}
                    </SelectItem>
                  ))}
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
