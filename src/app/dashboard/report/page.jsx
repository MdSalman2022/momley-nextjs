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
const ReportPage = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const pageName = "Reports";
  const actions = [
    { value: "Active", label: "Active" },
    { value: "Disabled", label: "Disabled" },
  ];

  const pages = [
    "Order Export",
    "Shipping Document",
    "Income Report",
    "Marketing Center Report",
    "Business Insights Reports",
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
      id: "ReportType",
      header: "Report Type",
      accessorKey: "ReportType",
    },
    {
      id: "RequestTime",
      header: "Request Time",
      accessorKey: "RequestTime",
    },
    {
      id: "RequestAccount",
      header: "Request Account",
      accessorKey: "RequestAccount",
    },
    {
      id: "ReportName",
      header: "Report Name",
      accessorKey: "ReportName",
    },
    {
      id: "Action",
      header: "Action",
      accessorKey: "Action", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("row", row);
        return <p className="text-[#2F80ED]">Download</p>;
      },
      enableSorting: false, // Assuming sorting is not needed for actions
    },
  ];

  const data = [
    {
      id: "1",
      ReportType: "All",
      RequestTime: "22/05/2021  12:230:39",
      RequestAccount: "farukuiux01",
      ReportName: "Order.all.20211004_20211103.xlsx",
    },
    {
      id: "2",
      ReportType: "Order",
      RequestTime: "23/08/2021  04:28:40 ",
      RequestAccount: "abdulkhan28",
      ReportName: "Order.toship.20210907_20211007.xlsx",
    },
    {
      id: "3",
      ReportType: "To shipp",
      RequestTime: "23/08/2021  04:28:40 ",
      RequestAccount: "abdulkhan28",
      ReportName: "Not Sent",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <p className="font-semibold">Reports</p>
        <span className="text-[#BDBDBD] text-sm">
          Download and view your reports from the past 6 months{" "}
        </span>
      </div>
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

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-[#828282]">02 Reports</p>
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

export default ReportPage;
