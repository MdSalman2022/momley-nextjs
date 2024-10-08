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
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

const AddMenu = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllMenus, CreateMenu } = useCategory();
  const storeId = userInfo?.store?._id;

  const {
    data: menus = {},
    isLoading: isMenuLoading,
    refetch: refetchMenu,
  } = useQuery({
    queryKey: ["menus", storeId],
    queryFn: () => storeId && getAllMenus(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

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

  const createRows = (categories) => {
    return categories.map((category, index) => [
      {
        value: `#${index + 1}`,
        className: "text-[#2F80ED]",
        onClick: handleCellClick,
      },
      { value: category.name },
      {
        value: new Date(category.createdAt).toLocaleDateString(),
        className: "",
      },
      { value: "Edit / Delete", className: "", onClick: handleCellClick },
    ]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

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
        {menus?.data?.map((menu) => (
          <div key={menu?._id} className="flex flex-col">
            <div className="flex items-center gap-3">
              <p className="font-medium">{menu?.name} list</p>
              <Link
                href={`/dashboard/navigation/add_menu/add_category/${menu?._id}`}
                className="cursor-pointer"
              >
                <MdEdit />
              </Link>
            </div>
            {menu?.categories?.length > 0 && (
              <TableComponent
                headers={headers}
                rows={createRows(menu.categories)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMenu;
