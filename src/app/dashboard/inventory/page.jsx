"use client";
import React, { useState } from "react";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/app/profile/orders/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import ProductsInventoryTable from "./ProductsInventoryTable";
import useProduct from "@/hooks/useProduct";
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";

const Inventory = () => {
  const { GetProducts } = useProduct();
  const {
    data: allProducts = {},
    isLoading: isProductLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => GetProducts(),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("allProducts", allProducts);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const actions = [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  const pages = ["All", "Active", "Inactive", "Stock Out"];
  const [activePage, setActivePage] = useState(pages[0]);

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };
  const paymentOptions = ["Paid", "Due", "Partial"];

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
      id: "productName",
      header: "Product Name",
      accessorKey: "productName",
    },
    {
      id: "Price",
      header: "Price",
      accessorKey: "Price",
    },
    {
      id: "SalePrice",
      header: "Sale Price",
      accessorKey: "SalePrice",
    },
    {
      id: "Stock",
      header: "Stock",
      accessorKey: "Stock",
    },
    {
      id: "Sales",
      header: "Sales",
      accessorKey: "Sales",
    },
    /*   {
      id: "Vendor",
      header: "Vendor",
      accessorKey: "Vendor",
    }, */
    {
      id: "Stock",
      header: "Stock",
      accessorKey: "Stock", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("row", row);
        return (
          <Select onValueChange={handleValueChange} aria-label="Select action">
            <SelectTrigger className="w-40 h-10 mt-1 border-0">
              <SelectValue
                placeholder={
                  row?.original.stock?.inStock ? "In Stock" : "Out of Stock"
                }
              />
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
  ];

  const productList =
    !isProductLoading &&
    allProducts?.products?.map((product) => ({
      productName: product.name,
      Price: product.price,
      SalePrice: product.salePrice,
      Stock: product.stock?.quantity,
      Sales: product.sales?.total,
      vendor: product.vendor,
      Stock: product.stock?.inStock ? "Active" : "Disabled",
    }));

  console.log("productList", productList);

  const data = [
    {
      id: "1",
      productName: "Product 1",
      Price: "100.00",
      Stock: "100",
      Sales: "50",
      Vendor: "Vendor 1",
      Status: "Active",
    },
    {
      id: "1",
      productName: "Product 2",
      Price: "300.00",
      Stock: "100",
      Sales: "50",
      Vendor: "Vendor 2",
      Status: "Disabled",
    },
  ];

  if (isProductLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-5 px-6">
      <TopActionButtons
        title="Inventory"
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
        handleFunction={() => console.log("Creating Order...")}
        functionTitle="View Product"
      />
      <div className="flex flex-col gap-5 p-6 border rounded">
        <div className="flex items-center gap-3">
          {pages.map((page, index) => (
            <button
              type="button"
              onClick={() => setActivePage(page)}
              key={index}
              className={`text-sm px-3 ${
                activePage === page
                  ? "border-b-2 border-black font-semibold"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Search products name, ID"
          />
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Payments Status"
          />
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-40 h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
              <SelectValue placeholder="Payments Status" />
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((option, index) => (
                // Ensure each SelectItem has a unique key
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button type="button" className="primary-btn">
            Search
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <p>02 Orders</p>
          <DataTable
            columns={columns}
            data={productList}
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
    </div>
  );
};

export default Inventory;
