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
    { label: "Serial", className: "w-[200px]" },
    { label: "Menu" },
    { label: "Date", className: "w-[200px]" },
    { label: "Action", className: "w-[200px]" },
  ];

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const rows = (Array.isArray(categories) ? categories : []).map(
    (category, index) => [
      { value: "", className: "" },
      {
        value: `#${index + 1}`,
        className: "text-[#2F80ED]",
        onClick: handleCellClick,
      },
      { value: category.name },
      { value: formatTime(category?.createdAt), className: "" },
      { value: "Edit / Delete", className: "", onClick: handleCellClick },
    ]
  );

  /* const rows = [
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
  ]; */

  const [selectedValue, setSelectedValue] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleAddCategory = async () => {
    if (categoryName.trim()) {
      const payload = { name: categoryName, storeId: userInfo?.store?._id };
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
