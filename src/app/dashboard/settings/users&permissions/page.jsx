"use client";
import { DataTable } from "@/app/profile/orders/data-table";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useState } from "react";
import avatar from "@/../public/images/profile/avatar.jpg";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const UsersPermissions = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const pageName = "Users";

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
      id: "AdminUserName",
      header: "Admin & User Name",
      accessorKey: "AdminUserName",
    },
    {
      id: "Phonenumber",
      header: "Phone number",
      accessorKey: "Phonenumber",
    },
    {
      id: "Email",
      header: "Email",
      accessorKey: "Email",
    },
    {
      id: "Access",
      header: "Access",
      accessorKey: "Access",
    },
    {
      id: "Action",
      header: "Action",
      accessorKey: "Action", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("row", row);
        return <p className="text-[#2F80ED]">Edit/Add</p>;
      },
      enableSorting: false, // Assuming sorting is not needed for actions
    },
  ];

  const data = [
    {
      id: "1",
      AdminUserName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Admin 1</span>
            <span>Admin</span>
          </div>
        </span>
      ),
      Phonenumber: "01700000000",
      Email: "farukmix2@gmail.com",
      Access: "Full access",
    },
    {
      id: "2",
      AdminUserName: (
        <span className="flex items.center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col">
            <span>Mod 1</span>
            <span>Moderator</span>
          </div>
        </span>
      ),
      Phonenumber: "01700000000",
      Email: "momleyoline@gmail.com",
      Access: "Order  page access",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="User and Permission"
        handleFunction={() => console.log("Creating Order...")}
        functionTitle="Add new User/staff "
      />

      <div className="flex flex-col gap-3 border p-6 rounded">
        <p>05 Admin & Users</p>
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

      <p className="font-semibold">Add a new user/staff</p>
      <div className="border p-6 rounded">
        <form action="" className="grid grid-cols-2 gap-5">
          <label htmlFor="" className="flex flex-col gap-1">
            <span>Full Name*</span>
            <input
              type="text"
              className="input-box"
              placeholder="Enter your full name"
            />
          </label>
          <label htmlFor="" className="flex flex-col gap-1">
            <span>Mobile number or Email**</span>
            <input
              type="text"
              className="input-box"
              placeholder="Enter your mobile or Email address"
            />
          </label>
          <div className="col span-2 flex flex-col gap-5">
            <p className="font-semibold">Assign a New Page Role</p>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex items-center gap-3">
                <Checkbox />
                <span>Order Page</span>
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <Checkbox />
                <span>Navigation </span>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox />
                <span>Product Page </span>
              </div>
              <div className="flex items-center gap-3 col-span-2">
                <Checkbox />
                <span>Blog </span>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox />
                <span>Single Page </span>
              </div>
              <div className="flex items-center justify-end gap-3 col-span-2">
                <button className="primary-btn">Send invite</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersPermissions;
