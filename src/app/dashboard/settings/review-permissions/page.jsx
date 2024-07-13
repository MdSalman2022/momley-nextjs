"use client";
import { DataTable } from "@/app/profile/orders/data-table";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import avatar from "@/../public/images/profile/avatar.jpg";
import Image from "next/image";

const ReviewPermissions = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const pageName = "Customers";

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
      id: "ProductsName",
      header: "Products Name",
      accessorKey: "ProductsName",
    },
    {
      id: "OrderId",
      header: "Order Id",
      accessorKey: "OrderId",
    },
    {
      id: "Customer",
      header: "Customer",
      accessorKey: "Customer",
    },
    {
      id: "Review",
      header: "Review",
      accessorKey: "Review",
    },
    {
      id: "Published",
      header: "Published",
      accessorKey: "Published",
    },
    {
      id: "Action",
      header: "Action",
      accessorKey: "Action", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("row", row);
        return <p className="text-[#2F80ED] font-semibold">Active</p>;
      },
      enableSorting: false, // Assuming sorting is not needed for actions
    },
  ];

  const data = [
    {
      id: "1",
      ProductsName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Customers 1</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </span>
      ),
      OrderId: "SKU 154254",
      Customer: "Customer 1",
      Review: "Review 1",
      Published: "Published 1",
      Action: "Active",
    },
    {
      id: "2",
      ProductsName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Customers 1</span>
            <span>Dhaka, Bangladesh</span>
          </div>
        </span>
      ),
      OrderId: "SKU 154254",
      Customer: "Customer 1",
      Review: "Review 1",
      Published: "Published 1",
      Action: "Active",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Review List"
        handleFunction={() => console.log("Creating Order...")}
        functionTitle="Create a review"
      />

      <div className="border rounded flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <p>02 Reviews</p>
          <div className="flex py-5 gap-5">
            <input
              placeholder="Search page"
              type="text"
              className="input-box rounded-none"
            />
          </div>
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
  );
};

export default ReviewPermissions;
