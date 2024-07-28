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
const ProductsTable = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const actions = [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  const [allProducts, setAllProducts] = useState(null);
  const { GetProduct } = useProduct();

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await GetProduct();
      console.log("allProducts", allProducts);

      if (allProducts.success) {
        setAllProducts(allProducts?.data);
      }
      console.log("allProducts", allProducts);
    };

    fetchData();
  }, []);

  console.log("allProducts", allProducts);

  const handleValueChange = (value) => {
    setSelectedStatus(value);
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
            <SelectTrigger className="w-40 h-10 mt-1 border-0">
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
  ];

  const products =
    allProducts?.length > 0
      ? allProducts?.map((product, index) => ({
          name: product?.name,
          price: product?.price,
          stock: product?.stock?.quantity,
          weight: product?.weight,
          vendor: product?.vendor,
          status: product?.stock?.inStock ? "In Stock" : "Out of Stock",
        }))
      : [];

  console.log("products", products);

  // const data = [
  //   {
  //     id: "1",
  //     productName: "Product 1",
  //     Price: "100.00",
  //     Stock: "100",
  //     Sales: "50",
  //     Vendor: "Vendor 1",
  //     Status: "Active",
  //   },
  //   {
  //     id: "2",
  //     productName: "Product 2",
  //     Price: "300.00",
  //     Stock: "100",
  //     Sales: "50",
  //     Vendor: "Vendor 2",
  //     Status: "Disabled",
  //   },
  // ];

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

export default ProductsTable;
