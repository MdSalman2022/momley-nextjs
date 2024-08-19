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
import { storeId } from "@/libs/utils/common";
import { useQuery } from "react-query";

const OrdersTable = () => {
  const [allOrders, setAllOrders] = useState(null);
  const { getOrders } = useOrder();

  const {
    data: myorders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["myorders", storeId],
    queryFn: () => storeId && getOrders(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("myorders", myorders);

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

  const ordersArray =
    !isOrdersLoading && myorders?.data?.length
      ? myorders.data.map((order, index) => ({
          id: index + 1,
          orderId: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          totalPrice: `$${order.totalAmount.toFixed(2)}`,
          partialPayment: `$${order.paymentDetails.partialPayment.toFixed(2)}`,
          items: order.items.length,
          paymentMethod: order.paymentDetails.paymentMethod,
          status: order.status,
        }))
      : [];

  console.log("ordersArray", ordersArray);

  return (
    <div className="flex flex-col gap-3">
      <p>02 Orders</p>
      <DataTable
        columns={columns}
        data={ordersArray}
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
