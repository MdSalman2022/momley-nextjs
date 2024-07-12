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
import Image from "next/image";
import avatar from "@/../public/images/profile/avatar.jpg";
const Customers = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const pageName = "Customers";
  const actions = [
    { value: "Active", label: "Active" },
    { value: "Disabled", label: "Disabled" },
  ];

  const pages = [
    "All",
    "New",
    "Returning",
    "Abandoned Checkout",
    "Email Subscribers",
    "From Bangladesh",
  ];
  const [activePage, setActivePage] = useState(pages[0]);

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  const { sortType, setSortType } = useState("Newest");
  const handleSorting = (value) => {
    console.log("value", value);
    setSortType(value);
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
      id: "CustomersName",
      header: "Customers Name",
      accessorKey: "CustomersName",
    },
    {
      id: "Orders",
      header: "Orders",
      accessorKey: "Orders",
    },
    {
      id: "BDTSpent",
      header: "BDT Spent",
      accessorKey: "BDTSpent",
    },
  ];

  const data = [
    {
      id: "1",
      CustomersName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Customers 1</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </span>
      ),
      Orders: "5",
      BDTSpent: "500",
    },
    {
      id: "2",
      CustomersName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Customers 1</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </span>
      ),
      Orders: "10",
      BDTSpent: "1000",
    },
  ];

  return (
    <div className="flex flex-col gap-5 px-6">
      <TopActionButtons
        title={pageName}
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
        handleFunction={() => console.log("Creating Order...")}
        functionTitle="Add a New Product"
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
            placeholder="Search customers"
          />
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Email subscribers status"
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
          <div className="flex justify-between">
            <p>02 Customers</p>
            <Select onValueChange={handleSorting}>
              <SelectTrigger className="w-40 h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
                <SelectValue placeholder={sortType || "Most"} />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "most", label: "Most" },
                  { value: "least", label: "Least" },
                ].map((action, index) => (
                  <SelectItem key={index} value={action.value}>
                    {action.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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

export default Customers;
