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
import useSupplier from "@/hooks/useSupplier";
import toast from "react-hot-toast";
import { storeId } from "@/libs/utils/common";
import { useQuery } from "react-query";
import { MdDelete, MdEdit } from "react-icons/md";

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
  {
    name: "product",
    required: false,
    placeholder: "Enter product name",
    label: "Product Item",
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

const ShopperList = () => {
  const { createSupplier, getSuppliers, updateSupplier } = useSupplier();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState({});

  const {
    data: suppliersList = {},
    isLoading: isSuppliersListLoading,
    refetch: refetchSuppliersList,
  } = useQuery({
    queryKey: ["suppliersList", storeId],
    queryFn: () => getSuppliers(storeId),
  });

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("rowSelection", rowSelection);

  const onSubmit = async (data) => {
    if (isEdit) {
      const payload = {
        fullName: data.fullName,
        shopName: data.shopName,
        phone: data.phoneNumber,
        email: data.email,
        address: data.address,
        product: data.product,
        storeId: storeId,
        supplierId: selectedSupplier._id,
      };
      const response = await updateSupplier(payload);
      if (response.success) {
        toast.success("Shopper updated successfully");
        setRowSelection({});
        reset({
          fullName: "",
          phoneNumber: "",
          email: "",
          shopName: "",
          address: "",
          product: "",
        });
        refetchSuppliersList();
        setIsEdit(false);
      }
    } else {
      const payload = {
        fullName: data.fullName,
        shopName: data.shopName,
        phone: data.phoneNumber,
        email: data.email,
        address: data.address,
        product: data.product,
        storeId: storeId,
      };
      const response = await createSupplier(payload);
      if (response.success) {
        toast.success("Shopper added successfully");
        reset();
        refetchSuppliersList();
      }
    }
  };

  console.log("suppliersList", suppliersList);
  const suppliers = suppliersList?.data || [];

  const data = suppliers.map((supplier) => ({
    id: supplier._id || "",
    ShopperName: supplier.shopName || "",
    OwnerName: supplier.fullName || "",
    Phone: supplier.phone || "",
    ProductItem: supplier.product || "",
    Address: supplier.address || "",
  }));

  const handleEdit = () => {
    setIsEdit(true);
    const selectedSupplierId = Object?.keys(rowSelection)?.find(
      (key) => rowSelection[key]
    );
    console.log("selectedSupplierId", selectedSupplierId);
    const supplier = suppliers[selectedSupplierId];
    console.log("supplier", supplier);
    setSelectedSupplier(supplier);
    reset({
      fullName: supplier.fullName,
      phoneNumber: supplier.phone,
      email: supplier.email,
      shopName: supplier.shopName,
      address: supplier.address,
      product: supplier.product,
    });
  };

  const handleDelete = () => {
    // Handle delete action
    console.log("Delete action triggered");
  };

  const handleRowSelection = (rowSelection) => {
    try {
      if (!rowSelection || typeof rowSelection !== "object") {
        throw new Error("Invalid rowSelection object");
      }

      const selectedRows = Object.values(rowSelection).filter(
        (isSelected) => isSelected
      );

      return selectedRows;
    } catch (error) {
      console.error("Error processing row selection:", error.message);
      // Optionally, you can add more error handling logic here, such as displaying an error message to the user
      return [];
    }
  };

  const selectedRows = handleRowSelection(rowSelection);

  const isSingleRowSelected = selectedRows.length === 1;
  const isMultipleRowsSelected = selectedRows.length > 1;

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
              <span className="text-sm">
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
          <div className="flex justify-between items-center h-8">
            <p>{data?.length} shoppers</p>
            {(isSingleRowSelected || isMultipleRowsSelected) && (
              <div className="flex justify-end items-center gap-3 ">
                {isSingleRowSelected && (
                  <button
                    className="bg-black w-8 h-8 rounded-full flex items-center justify-center text-white text-xl"
                    onClick={handleEdit}
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                )}
                {(isMultipleRowsSelected || isSingleRowSelected) && (
                  <button
                    className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-xl"
                    onClick={handleDelete}
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            )}
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

export default ShopperList;
