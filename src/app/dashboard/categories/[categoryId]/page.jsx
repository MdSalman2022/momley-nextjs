"use client";
import { Checkbox } from "@/components/ui/checkbox";
import useCategory from "@/hooks/useCategory";
import { storeId } from "@/libs/utils/common";
import { DataTable } from "@/libs/utils/data-table";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useQuery } from "react-query";

const CategoryDetails = ({ params }) => {
  const { getCategoryBySlug } = useCategory();

  const {
    data: CategoryDetails = {},
    isLoading: isCategoryDetailsLoading,
    refetch: refetchCategoryDetails,
  } = useQuery({
    queryKey: ["CategoryDetails", storeId],
    queryFn: () => storeId && getCategoryBySlug(storeId, 5, params?.categoryId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const actions = [
    { value: "edit", label: "Edit", icon: <BiEdit /> },
    { value: "view", label: "View", icon: <AiOutlineEye /> },
  ];

  console.log("CategoryDetails", CategoryDetails);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const { sortType, setSortType } = useState("Newest");
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
      width: "50px", //
    },
    {
      id: "Product",
      header: "Product",
      accessorKey: "Product",
      width: "250px", //
    },
    {
      id: "Price",
      header: "Price",
      accessorKey: "Price",
      width: "100px", // Optional width
    },
    {
      id: "Inventory",
      header: "Inventory",
      accessorKey: "Inventory",
      width: "100px", // Optional width
    },
    {
      id: "Status",
      header: "Status",
      accessorKey: "Status",
      width: "100px", // Optional width
    },
    {
      id: "Tags",
      header: "Tags",
      accessorKey: "Tags",
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

  const rows =
    CategoryDetails?.data?.products?.length > 0 &&
    CategoryDetails?.data?.products.map((c, index) => {
      return {
        id: (index + 1).toString(),
        Product: (
          <Link
            href={`/dashboard/products/edit-product/${c.slug}`}
            className="font-semibold text-[#146eb4]"
          >
            {c.name}
          </Link>
        ),
        Price: c.salePrice,
        Inventory: c.stock?.quantity,
        Status: c.status === "active" ? "Active" : "Inactive",
        Tags: c.tags,
        link: `/dashboard/products/${c._id}/edit`,
      };
    });

  return (
    <div className="container mx-auto p-6 px-0">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{CategoryDetails?.data?.name}</h1>
          <Link
            href={`/dashboard/categories/${CategoryDetails?.data?.slug}/edit`}
            className="flex items-center text-sm text-gray-500"
          >
            <AiOutlineEdit className="mr-1" />
            <span>Edit Category</span>
          </Link>
        </div>
        <button className="primary-btn">
          <AiOutlineEye className="inline mr-1" />
          Preview
        </button>
      </div>

      {/* Reorder and Add Product Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <button className="primary-outline-btn">Reorder Products</button>
        <button className="primary-btn">Add New Product</button>
      </div>

      {/* Sort and Filter Buttons */}
      <div className="bg-white border p-4">
        <div className="flex justify-end gap-4 mb-6">
          <button className="primary-outline-btn">Sort By</button>
          <button className="primary-outline-btn">Filter</button>
        </div>

        {/* Table Section */}
        <DataTable
          columns={columns}
          data={rows}
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
    </div>
  );
};

export default CategoryDetails;
