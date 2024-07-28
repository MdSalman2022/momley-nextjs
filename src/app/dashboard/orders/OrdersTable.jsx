"use client";
import { DataTable } from "@/app/profile/orders/data-table";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import useOrder from "@/hooks/useOrder";

const OrdersTable = () => {
  const [allOrders, setAllOrders] = useState(null);
  const { getOrders } = useOrder();

  useEffect(() => {
    const fetchData = async () => {
      const allOrders = await getOrders();
      console.log("allOrders", allOrders);

      if (allOrders.success) {
        setAllOrders(allOrders?.data);
      }
      console.log("allOrders", allOrders);
    };

    fetchData();
  }, []);

  console.log("allOrders", allOrders);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const actions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivery", label: "Delivery" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleValueChange = (value) => {
    setSelectedStatus(value);
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
      id: "items",
      header: "Items",
      accessorKey: "items",
    },
    {
      id: "paymentMethod",
      header: "Payment Method",
      accessorKey: "paymentMethod",
    },
    {
      id: "status",
      header: "Action",
      accessorKey: "status", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => (
        <Select onValueChange={handleValueChange} aria-label="Select action">
          <SelectTrigger className="w-40 h-10 mt-1 border-0 capitalize">
            <SelectValue
              placeholder={selectedStatus || row?.original?.status}
            />
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

  const orders =
    allOrders?.length > 0
      ? allOrders?.map((order, index) => ({
          orderId: order?.orderNumber,
          date: order?.createdAt,
          totalPrice: order?.totalAmount,
          partialPayment: order?.paymentDetails?.partialPayment
            ? order?.paymentDetails?.partialPayment
            : "Paid",
          items: order?.items?.length,
          paymentMethod: order?.paymentDetails?.paymentMethod,
          status: order?.status,
        }))
      : [];

  console.log("orders", orders);

  // const data = [
  //   {
  //     id: "1",
  //     orderId: "123",
  //     date: "2023-04-01",
  //     totalPrice: "$100.00",
  //     partialPayment: "$50.00",
  //     items: 3,
  //     paymentMethod: "COD",
  //   },
  //   {
  //     id: "2",
  //     orderId: "456",
  //     date: "2023-04-02",
  //     totalPrice: "$200.00",
  //     partialPayment: "$100.00",
  //     items: 3,
  //     paymentMethod: "COD",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-3">
      <p>02 Orders</p>
      <DataTable
        columns={columns}
        data={orders}
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
  );
};

export default OrdersTable;
