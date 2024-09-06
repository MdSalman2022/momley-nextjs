"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCategory from "@/hooks/useCategory";
import { storeId } from "@/libs/utils/common";
import { useQuery } from "react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/libs/utils/data-table";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";

const Categories = () => {
  const { GetAllCategory } = useCategory();

  const {
    data: allCategories = {},
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["allCategories", storeId],
    queryFn: () => storeId && GetAllCategory(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("allCategories", allCategories);

  const actions = [
    { value: "edit", label: "Edit", icon: <BiEdit /> },
    { value: "view", label: "View", icon: <AiOutlineEye /> },
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const { sortType, setSortType } = useState("Newest");
  const handleSorting = (value) => {
    console.log("value", value);
    setSortType(value);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      accessorKey: "id", // Assuming each row has a unique 'id' field
    },
    {
      id: "Category",
      header: "Category",
      accessorKey: "Category",
    },
    {
      id: "Products",
      header: "Products",
      accessorKey: "Products",
      width: "200px", // Optional width
    },
    {
      id: "Status",
      header: "Status",
      accessorKey: "Status",
      width: "200px", // Optional width
    },
    {
      id: "Action",
      header: "Action",
      accessorKey: "Action", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-5">
          {actions.map((action, index) => (
            <Link
              key={index}
              className="text-primary text-xl"
              href={row.original.link}
            >
              {action.icon}
            </Link>
          ))}
        </div>
      ),
      enableSorting: false, // Assuming sorting is not needed for actions
      width: "100px", // Optional width
    },
  ];

  const myCategories = allCategories?.data || [];

  const categories = myCategories?.map((c, index) => {
    return {
      id: (index + 1).toString(),
      Category: (
        <Link
          href={`
        /dashboard/categories/${c?.slug}
        `}
          className="font-semibold text-[#146eb4]"
        >
          {c?.name}
        </Link>
      ),
      Products: (c?.products?.length > 0 && c?.products?.length) || 0,
      Status: c?.status,
      link: `/dashboard/categories/${c?._id}/edit`,
    };
  });

  const [enabled, setEnabled] = useState(false);
  return (
    <div className="py-6 w-full bg-white">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6 w-full">
        <input
          type="text"
          placeholder="Search categories..."
          className="border rounded-lg p-2 w-1/3"
        />
        <div className="flex gap-4">
          <button className="primary-outline-btn">Reorder Categories</button>
          <Link href="/dashboard/categories/add" className="primary-btn">
            Add New Category
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="mb-4 flex justify-end items-center">
        <div className="flex justify-end gap-4">
          <button className="primary-outline-btn">Sort By</button>
          <button className="primary-outline-btn">Filter</button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={categories}
        setSorting={setSorting}
        setColumnFilters={setColumnFilters}
        setColumnVisibility={setColumnVisibility}
        setRowSelection={setRowSelection}
        sorting={sorting}
        columnFilters={columnFilters}
        columnVisibility={columnVisibility}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default Categories;
