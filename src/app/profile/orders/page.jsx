"use client";
import React, { useState } from "react";
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

const MyOrders = () => {
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
      id: "action",
      header: "Action",
      accessorKey: "id", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => (
        <Select onValueChange={handleValueChange} aria-label="Select action">
          <SelectTrigger className="w-40 h-10 mt-1 border-0">
            <SelectValue placeholder={actions[0]?.label} />
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
      ),
      enableSorting: false, // Assuming sorting is not needed for actions
    },
  ];

  const data = [
    {
      id: "1",
      orderId: "123",
      date: "2023-04-01",
      totalPrice: "$100.00",
      partialPayment: "$50.00",
    },
    {
      id: "2",
      orderId: "456",
      date: "2023-04-02",
      totalPrice: "$200.00",
      partialPayment: "$100.00",
    },
  ];
  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };
  const paymentOptions = ["Paid", "Due", "Partial"];

  const [activePage, setActivePage] = useState(pages[0]);

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
