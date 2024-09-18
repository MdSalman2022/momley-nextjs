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
import useStaff from "@/hooks/useStaff";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

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
  const { createStaff, getStaffs } = useStaff();
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
  const {
    data: staffs = [],
    isLoading: isStaffsLoading,
    refetch: refetchStaffs,
  } = useQuery({
    queryKey: ["staffs", storeId],
    queryFn: () => storeId && getStaffs(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  console.log("pages", pages);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
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
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const selectedPages = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key].checked)
      .map((key) => checkboxValues[key]._id);

    const formData = {
      ...data,
      selectedPages,
    };
    console.log("payload", formData);

    const payload = {
      fullName: data.fullName,
      email: data.contact,
      permissions: selectedPages,
      storeId: storeId,
    };
    console.log("payload", payload);

    const response = await createStaff(payload);
    console.log("response", response);
    if (response?.success) {
      toast.success("Staff created successfully");
      reset();
      refetchStaffs();
      setCheckboxValues({});
      setSelectedRole("");
    } else {
      toast.error("Failed to create staff");
    }
  };

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
      id: "Role",
      header: "Role",
      accessorKey: "Role",
    },
    {
      id: "Action",
      header: "Action",
      accessorKey: "Action", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        // console.log("row", row);
        return <p className="text-[#2F80ED]">Edit/Delete</p>;
      },
      enableSorting: false, // Assuming sorting is not needed for actions
    },
  ];

  console.log("staffs", staffs);

  const roles = [
    { id: 1, name: "Admin", value: "admin" },
    { id: 2, name: "Moderator", value: "moderator" },
    { id: 3, name: "Store Manager", value: "store_manager" },
    { id: 4, name: "Sales Associate", value: "sales_associate" },
  ];

  const [selectedRole, setSelectedRole] = useState("");

  const allStaffs = staffs?.data;

  const data =
    allStaffs?.length > 0 &&
    allStaffs?.map((staff) => ({
      id: staff._id || "",
      AdminUserName: (
        <span className="flex items-center gap-1">
          <Image src={avatar} className="w-10 h-10 rounded-lg" alt="Avatar" />
          <div className="flex flex-col">
            <span>{staff.fullName || ""}</span>
            <span>{staff.role || ""}</span>
          </div>
        </span>
      ),
      Phonenumber: staff.phone, // Assuming phone number is not available in the staff object
      Email: staff.email || "",
      Role: staff.role || "", // Assuming permissions are joined as a string
    }));

  const defaultCheckboxValues = {
    admin: pages.reduce(
      (acc, page) => ({
        ...acc,
        [page.name]: { checked: true, _id: page._id },
      }),
      {}
    ),
    moderator: pages.reduce(
      (acc, page) => ({
        ...acc,
        [page.name]: {
          checked: page.name.toLowerCase() !== "settings",
          _id: page._id,
        },
      }),
      {}
    ),
    store_manager: pages.reduce(
      (acc, page) => ({
        ...acc,
        [page.name]: {
          checked: [
            "order",
            "products",
            "inventory",
            "shopper list",
            "customers",
            "discount",
          ].includes(page.name.toLowerCase()),
          _id: page._id,
        },
      }),
      {}
    ),
    sales_associate: pages.reduce(
      (acc, page) => ({
        ...acc,
        [page.name]: {
          checked: ["order", "products", "inventory"].includes(
            page.name.toLowerCase()
          ),
          _id: page._id,
        },
      }),
      {}
    ),
  };

  useEffect(() => {
    if (selectedRole) {
      setCheckboxValues(defaultCheckboxValues[selectedRole] || {});
    }
  }, [selectedRole]);

  console.log("checkboxValues", checkboxValues);
  console.log("defaultCheckboxValues", defaultCheckboxValues);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  if (isPagesLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons title="User and Permission" />
      <div className="border p-6 rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-5"
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
          <label htmlFor="fullName" className="flex flex-col gap-1">
            <span>Role*</span>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="input-box h-10 border-black/40">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.value}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.fullName && (
              <span className="text-sm text-red-600">
                {errors.fullName.message}
              </span>
            )}
          </label>

          <div className="col-span-3 flex flex-col gap-5 w-full">
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
            <div className="flex items-center justify-end gap-3 col-span-3">
              <button type="submit" className="primary-btn">
                Send invite
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-3 rounded">
        <p className="font-semibold">{allStaffs?.length} Admin & Staffs</p>
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

export default UsersPermissions;
