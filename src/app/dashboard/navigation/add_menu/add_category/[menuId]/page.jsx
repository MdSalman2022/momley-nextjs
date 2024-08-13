"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

const AddCategoryToMenu = ({ params }) => {
  const { userInfo } = useContext(StateContext);
  const { getMenuById, AddCategoryToMenu, getAllCategories } = useCategory();
  const storeId = userInfo?.store?._id;
  const depth = 5;
  const menuId = params.menuId;

  const {
    data: menus = {},
    isLoading: isMenuLoading,
    refetch: refetchMenu,
  } = useQuery({
    queryKey: ["menus", storeId, depth, menuId],
    queryFn: () => storeId && getMenuById(storeId, depth, menuId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });
  const {
    data: allCategories = {},
    isLoading: isCategoryLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["allCategories", storeId],
    queryFn: () => storeId && getAllCategories(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("allCategories", allCategories);

  console.log("menus", menus);

  const headers = [
    { label: "Serial", className: "w-[200px]" },
    { label: "Menu" },
    { label: "Date", className: "w-[200px]" },
    { label: "Action", className: "w-[200px]" },
  ];

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (menus?.data?.categories?.length > 0) {
      const newRows = [];
      menus?.data?.categories?.forEach((subcategory, subIndex) => {
        const row = [
          {
            value: `#${subIndex + 1}`,
            className: "text-[#2F80ED]",
            onClick: handleCellClick,
          },
          { value: subcategory.name },
          {
            value: new Date(subcategory.createdAt).toLocaleDateString(),
            className: "",
          },
          { value: "Edit / Delete", className: "", onClick: handleCellClick },
        ];
        newRows.push(row);
      });
      setRows(newRows);
    }
  }, [menus]);

  console.log("rows", rows);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const formRef = useRef(null);

  const handleSelectChange = (value) => {
    setValue("category", value);
  };

  const handleSubmitForm = async (data) => {
    if (!data.category) {
      return toast.error("Please fill all the fields");
    }

    const payload = {
      categoryId: data.category,
      id: menuId,
    };
    console.log("payload", payload);
    const response = await AddCategoryToMenu(payload);
    if (response?.success) {
      refetchMenu();
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

  if (isMenuLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Add Category"
        handleFunction={() => handleSaveChanges()}
        functionTitle="Save Changes"
      />

      <form
        ref={formRef}
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Select Category</label>
          <Select
            onValueChange={handleSelectChange}
            {...register("category", { required: "category is required" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select A Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allCategories?.data?.map((category) => (
                  <SelectItem value={category._id}>{category.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
      </form>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <p className="font-medium">{menus?.data?.name} list</p>
          </div>
          {rows?.length > 0 && <TableComponent headers={headers} rows={rows} />}
        </div>
      </div>
    </div>
  );
};

export default AddCategoryToMenu;
