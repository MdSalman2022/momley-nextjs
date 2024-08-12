"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useContext, useState } from "react";
import moveIcon from "@/../public/images/icons/moveIcon.svg";
import Image from "next/image";
import TableComponent from "@/components/Shared/TableComponent";
import { useRouter } from "next/navigation";
import useCategory from "@/hooks/useCategory";
import { useQuery } from "react-query";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import toast from "react-hot-toast";
import HeadlessModalBox from "@/components/Shared/HeadlessModalBox";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllCategoriesLevel, CreateCategoryLevel, CreateMenu, GetMenus } =
    useCategory();
  const router = useRouter();
  const pathname = usePathname();
  console.log("router", router, pathname);

  const storeId = userInfo?.store?._id;

  const {
    data: categoriesLevel = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categoriesLevel", storeId],
    queryFn: () => storeId && getAllCategoriesLevel(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });
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

  const allMenus = !isMenuLoading && getMenus?.data;

  const menuheaders = [
    { label: "Menu", className: "w-[200px]" },
    { label: "Items" },
    { label: "Action", className: "w-[200px]" },
  ];

  const headers = [
    { label: "Level", className: "w-[50px]" },
    { label: "Category", className: "w-[180px]" },
    { label: "Items" },
    { label: "Action", className: "w-[100px]" },
  ];

  const menurows = allMenus.map((menu) => [
    { value: menu.name, className: "text-[#2F80ED]" },
    { value: menu.categories.join(", ") || "No categories" },
    { value: "Add item", className: "text-[#2F80ED]" },
  ]);

  const rows =
    categoriesLevel?.data?.length > 0
      ? categoriesLevel?.data?.map((item, index) => [
          { value: item.level, className: "" },
          { value: item.name, className: "" },
          {
            value: item?.categories
              ?.map((category) => category?.name)
              .join(", "),
          },
          {
            value: "Add item",
            className: "text-[#2F80ED] cursor-pointer",
            onClick: () =>
              index === 0
                ? router.push(`/dashboard/navigation/add_category`)
                : router.push(
                    `/dashboard/navigation/add_sub_category/${item?.level}`
                  ),
          },
        ])
      : [];

  const handleCreateCategoryLevel = async () => {
    const payload = {
      storeId: userInfo?.store?._id,
    };
    const response = await CreateCategoryLevel(payload);
    if (response?.success) {
      refetch();
    }
  };
  if (!userInfo || isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Navigation"
        handleFunction={() => router.push(`${pathname}/add_menu`)}
        functionTitle="Add Menu "
      />{" "}
      <div className="flex flex-col gap-5 w-full">
        <TableComponent headers={menuheaders} rows={menurows} />
        <TopActionButtons
          title="Category"
          handleFunction={() => handleCreateCategoryLevel()}
          functionTitle="Add Category"
        />
        <div className="border px-6 py-6 rounded">
          <TableComponent headers={headers} rows={rows} />
        </div>
        <div className="border px-6 py-6 rounded flex flex-col gap-3">
          <div className="flex items-center justify-between h-10 border-b">
            <p className="font-semibold">Filter</p>
            <p className="w-[10%] flex justify-start text-[#2F80ED]">
              Add Filter
            </p>
          </div>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-5">
              <span>
                <Image src={moveIcon} alt="moveIcon" />
              </span>
              <p className="font-semibold">Price</p>
            </div>
            <p className="w-[10%] flex justify-start text-[#EB5757]">Delete</p>
          </div>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-5">
              <span>
                <Image src={moveIcon} alt="moveIcon" />
              </span>
              <p className="font-semibold">Availability</p>
            </div>
            <p className="w-[10%] flex justify-start text-[#EB5757]">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
