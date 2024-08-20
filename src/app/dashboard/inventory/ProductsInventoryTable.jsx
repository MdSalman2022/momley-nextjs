"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/app/profile/orders/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useProduct from "@/hooks/useProduct";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { BsThreeDots } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const ProductsInventoryTable = ({ allProducts, isProductLoading }) => {
  const router = useRouter();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const actions = [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  console.log("allProducts", allProducts);

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  const handleEdit = (slug) => {
    router.push(`/dashboard/products/edit-product/${slug}`);
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
      id: "name",
      header: "Product Name",
      accessorKey: "name",
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
    },
    {
      id: "stock",
      header: "Stock",
      accessorKey: "stock",
    },
    {
      id: "weight",
      header: "Weight",
      accessorKey: "weight",
    },
    {
      id: "vendor",
      header: "Vendor",
      accessorKey: "vendor",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("row", row);
        return (
          <Select onValueChange={handleValueChange} aria-label="Select action">
            <SelectTrigger className="w-24 h-8 border text-xs">
              <SelectValue placeholder={row?.original?.status} />
            </SelectTrigger>
            <SelectContent>
              {actions.map((option, index) => {
                const value = option?.value || `fallback-value-${index}`;
                if (!option?.value) return null;
                return (
                  <SelectItem key={index} value={value}>
                    {option?.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );
      },
      enableSorting: false, // Assuming sorting is not needed for actions
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "id", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex justify-center items-center text-black bg-primary hover:bg-gray-100 w-8 h-8 rounded-full"
                >
                  <BsThreeDots />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32" align="end">
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem
                    value="Edit"
                    className="cursor-pointer"
                    onSelect={() => handleEdit(row?.original?.slug)}
                  >
                    Edit
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="Delete"
                    className="cursor-pointer"
                  >
                    Delete
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const products =
    allProducts?.length > 0
      ? allProducts?.map((product, index) => ({
          id: product?._id,
          name: product?.name,
          slug: product?.slug,
          price: product?.salePrice || product?.price,
          stock: product?.stock?.quantity,
          weight: product?.weight,
          vendor: product?.vendor,
          status: product?.stock?.inStock ? "In Stock" : "Out of Stock",
        }))
      : [];

  console.log("products", products);

  if (isProductLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      {" "}
      <DataTable
        columns={columns}
        data={products}
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

export default ProductsInventoryTable;
