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
import useCart from "@/hooks/useCart";
import { storeId } from "@/libs/utils/common";
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";

const AbandonedOrders = () => {
  const { getAbandonedCart } = useCart();

  const {
    data: allAbandonedCart = {},
    isLoading: isAbandonedCartLoading,
    refetch: refetchAbandonedCart,
  } = useQuery({
    queryKey: ["allAbandonedCart", storeId],
    queryFn: () => storeId && getAbandonedCart(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("allAbandonedCart", allAbandonedCart);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const actions = [
    { value: "processing", label: "Processing" },
    { value: "delivery", label: "Delivery" },
  ];

  const pages = [
    "All",
    "Unpaid",
    "Unfulfilled",
    "Shipping",
    "Completed",
    "Cancellation",
    "Return/Refund",
  ];
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
      id: "id",
      header: "Id",
      accessorKey: "id",
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
    },
    {
      id: "placedBy",
      header: "Placed By",
      accessorKey: "placedBy",
    },
    {
      id: "emailStatus",
      header: "Email Status",
      accessorKey: "emailStatus",
    },
    {
      id: "products",
      header: "Products",
      accessorKey: "products",
    },
    {
      id: "totalPrice",
      header: "Total Price",
      accessorKey: "totalPrice",
    },
  ];

  const data =
    allAbandonedCart?.length > 0
      ? allAbandonedCart?.map((cart) => {
          const id = cart._id;
          const date = new Date(cart.updatedAt).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
          const placedBy = `${cart.customerInfo.firstName} ${cart.customerInfo.lastName}`;
          const emailStatus = "Unknown"; // Replace with actual logic to determine email status if available
          const products = (
            <div className="flex flex-col text-xs">
              {cart.items.map((item) => item.product.name).join(", ")}
            </div>
          );
          const totalPrice = cart.items.reduce(
            (total, item) => total + item.price,
            0
          );

          return {
            id,
            date,
            placedBy,
            emailStatus,
            products,
            totalPrice,
          };
        })
      : [];

  if (isAbandonedCartLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Abandoned Checkout"
        onExport={() => console.log("Exporting...")}
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
            data={data}
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

export default AbandonedOrders;
