"use client";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useReactTable } from "@tanstack/react-table";
import useOrder from "@/hooks/useOrder";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";

const MyOrders = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllOrderByUser } = useOrder();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const pages = [
    "All",
    "Unpaid",
    "Shipping",
    "Completed",
    "Cancellation",
    "Return/Refund",
  ];

  const actions = [
    { value: "processing", label: "Processing" },
    { value: "delivery", label: "Delivery" },
  ];

  const customerId = userInfo?.customer?._id;
  console.log("customerId", customerId);

  const {
    data: orders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => customerId && getAllOrderByUser(customerId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("orders", orders);

  const handleActionChange = (value) => {
    console.log(value);
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
      id: "orderId",
      header: "Order Id",
      accessorKey: "orderId",
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
    },
    {
      id: "totalPrice",
      header: "Total Price",
      accessorKey: "totalPrice",
    },
    {
      id: "partialPayment",
      header: "Partial Payment",
      accessorKey: "partialPayment",
    },
    {
      id: "status",
      header: "status",
      accessorKey: "status", // Assuming actions are tied to the row's unique 'id'
    },
  ];

  const ordersArray =
    !isOrdersLoading && orders?.data?.length
      ? orders.data.map((order, index) => ({
          id: index + 1,
          orderId: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          totalPrice: `$${order.totalAmount.toFixed(2)}`,
          partialPayment: `$${order.paymentDetails.partialPayment.toFixed(2)}`,
          status: order.status,
        }))
      : [];

  const data = ordersArray;
  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };
  const paymentOptions = ["Paid", "Due", "Partial"];

  const [activePage, setActivePage] = useState(pages[0]);

  if (isOrdersLoading) {
    return <LoadingAnimation />;
  }
  return (
    <form className="flex flex-col gap-10">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold">Personal Info</p>
        <button type="submit" className="primary-btn">
          Save and Changes
        </button>
      </div>

      <div className="flex items-center gap-3">
        {pages.map((page, index) => (
          <button
            type="button"
            onClick={() => setActivePage(page)}
            key={index}
            className={`text-sm px-3 ${
              activePage === page ? "border-b-2 border-black font-semibold" : ""
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
    </form>
  );
};

export default MyOrders;
