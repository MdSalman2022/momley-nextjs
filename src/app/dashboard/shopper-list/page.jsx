"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/app/profile/orders/data-table";

const ShopperList = () => {
  const actions = [
    { value: "Active", label: "Active" },
    { value: "Disabled", label: "Disabled" },
  ];
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  const inputFields = [
    {
      name: "fullName",
      required: true,
      placeholder: "Enter your full name",
      label: "Full Name",
    },
    {
      name: "phoneNumber",
      required: true,
      placeholder: "Enter your phone number",
      label: "Phone Number",
    },
    {
      name: "email",
      required: false,
      placeholder: "Enter your email",
      label: "Email",
    },
    {
      name: "shopName",
      required: true,
      placeholder: "Enter your shop name",
      label: "Shop Name",
    },
    {
      name: "address",
      required: false,
      placeholder: "Enter your address",
      label: "Address",
    },
  ];

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
      id: "ShopperName",
      header: "Shopper Name",
      accessorKey: "ShopperName",
    },
    {
      id: "OwnerName",
      header: "Owner name",
      accessorKey: "OwnerName",
    },
    {
      id: "Phone",
      header: "Phone",
      accessorKey: "Phone",
    },
    {
      id: "ProductItem",
      header: "Product Item",
      accessorKey: "ProductItem",
    },
    {
      id: "Address",
      header: "Address",
      accessorKey: "Address",
    },
  ];

  const data = [
    {
      id: "1",
      ShopperName: "Shopper 1",
      OwnerName: "Owner 1",
      Phone: "1234567890",
      ProductItem: "Product 1",
      Address: "Address 1",
    },
    {
      id: "2",
      ShopperName: "Shopper 2",
      OwnerName: "Owner 2",
      Phone: "1234567890",
      ProductItem: "Product 2",
      Address: "Address 2",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons title="Shopper" functionTitle={"Add a New Shopper"} />
      <div className="border rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 p-6 gap-4"
        >
          {inputFields.map(({ name, required, placeholder, label }) => (
            <label key={name}>
              <span>
                {label}
                {required && "*"}
              </span>
              <input
                {...register(name, { required })}
                type={name === "email" ? "email" : "text"}
                className="input-box w-[360px]"
                placeholder={placeholder}
              />
              {errors[name] && (
                <span className="text-red-600 text-xs">
                  {label} is required
                </span>
              )}
            </label>
          ))}
          <div className="col-span-1 flex flex-col justify-end">
            <button
              type="submit"
              className="primary-btn w-[360px] flex justify-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="border rounded">
        <div className="p-6 flex flex-col gap-3">
          <p>105 shoppers</p>
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

export default ShopperList;
