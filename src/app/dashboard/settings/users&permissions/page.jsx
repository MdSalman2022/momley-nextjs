"use client";
import { DataTable } from "@/app/profile/orders/data-table";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useEffect, useState } from "react";
import avatar from "@/../public/images/profile/avatar.jpg";
import { Checkbox } from "@headlessui/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import usePage from "@/hooks/usePage";
import { storeId } from "@/libs/utils/common";
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import useStore from "@/hooks/useStore";

const CheckboxComp = ({ name, checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      className="group size-6 rounded-md bg-black/5 p-1 ring-1 ring-black/50 ring-inset data-[checked]:bg-black cursor-pointer"
    >
      {checked && (
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Checkbox>
  );
};

const CheckboxItem = ({ name, label, checked, onChange, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CheckboxComp name={name} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </div>
  );
};

const UsersPermissions = () => {
  const { createStaff } = useStore();
  const { getPages } = usePage();

  const {
    data: pages = [],
    isLoading: isPagesLoading,
    refetch: refetchPages,
  } = useQuery({
    queryKey: ["pages", storeId],
    queryFn: () => storeId && getPages(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  console.log("pages", pages);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [checkboxValues, setCheckboxValues] = useState({});

  useEffect(() => {
    if (!isPagesLoading) {
      setCheckboxValues(
        pages.reduce((acc, page) => {
          acc[page.name] = { checked: false, _id: page._id };
          return acc;
        }, {})
      );
    }
  }, [pages, isPagesLoading]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const selectedPages = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key].checked)
      .map((key) => checkboxValues[key]._id);

    const formData = {
      ...data,
      selectedPages,
    };
    console.log("datadata", formData);

    const payload = {
      fullName: data.fullName,
      email: data.contact,
      permissions: selectedPages,
      store: storeId,
    };

    const response = createStaff(payload);
    console.log("response", response);
    if (response?.success) {
      refetchPages();
    }
  };

  const roles = [
    { id: 1, name: "Moderator", value: "moderator" },
    { id: 2, name: "Store Manager", value: "store_manager" },
    { id: 3, name: "Sales Associate", value: "sales_associate" },
    { id: 4, name: "Inventory Specialist", value: "inventory_specialist" },
    {
      id: 5,
      name: "Customer Service Representative",
      value: "customer_service_representative",
    },
    { id: 6, name: "Cashier", value: "cashier" },
    { id: 7, name: "Visual Merchandiser", value: "visual_merchandiser" },
    { id: 8, name: "Marketing Coordinator", value: "marketing_coordinator" },
    { id: 9, name: "Logistics Coordinator", value: "logistics_coordinator" },
  ];

  console.log("checkboxValues", checkboxValues);

  const handleCheckboxChange = (name) => (checked) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: { ...prevValues[name], checked },
    }));
    setValue(name, checked);
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
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
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
        // console.log("row", row);
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

  const items = [
    {
      id: "recents",
      label: "Recents",
    },
    {
      id: "home",
      label: "Home",
    },
    {
      id: "applications",
      label: "Applications",
    },
    {
      id: "desktop",
      label: "Desktop",
    },
    {
      id: "downloads",
      label: "Downloads",
    },
    {
      id: "documents",
      label: "Documents",
    },
  ];

  if (isPagesLoading) {
    return <LoadingAnimation />;
  }

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >
          <label htmlFor="fullName" className="flex flex-col gap-1">
            <span>Full Name*</span>
            <input
              type="text"
              className="input-box"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <span className="text-sm text-red-600">
                {errors.fullName.message}
              </span>
            )}
          </label>
          <label htmlFor="contact" className="flex flex-col gap-1">
            <span>Email*</span>
            <input
              type="email"
              className="input-box"
              placeholder="Enter your mobile or Email address"
              {...register("contact", { required: "Contact is required" })}
            />
            {errors.contact && (
              <span className="text-sm text-red-600">
                {errors.contact.message}
              </span>
            )}
          </label>
          <div className="col-span-2 flex flex-col gap-5 w-full">
            <p className="font-semibold">Assign a New Page Role</p>
            <div className="grid grid-cols-3 gap-5">
              {pages?.map((page) => (
                <React.Fragment key={page._id}>
                  <CheckboxItem
                    name={page.name}
                    label={page.name}
                    checked={checkboxValues[page.name]?.checked || false}
                    onChange={handleCheckboxChange(page.name)}
                    className=""
                  />
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 col-span-2">
              <button type="submit" className="primary-btn">
                Send invite
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersPermissions;
