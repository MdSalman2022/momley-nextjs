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
import toast from "react-hot-toast";

const OrdersTable = ({ activePage, searchText }) => {
  const { getOrders, UpdateOrder } = useOrder();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const {
    data: myorders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["myorders", storeId, searchText],
    queryFn: () => storeId && getOrders(storeId, searchText),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("myorders", myorders);
  console.log("activePage", activePage);

  const actions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "return/refund", label: "Return/Refund" },
  ];

  const [statusForEach, setStatusForEach] = useState([]);

  console.log("statusForEach", statusForEach);

  useEffect(() => {
    if (!isOrdersLoading) {
      const status =
        myorders?.data?.[activePage]?.length > 0 &&
        myorders?.data?.[activePage]?.map((order) => order.status);
      console.log("status", status);
      setStatusForEach(status);
    }
  }, [isOrdersLoading]);

  const handleUpdateStatus = async (value, item) => {
    console.log("item", item);
    setStatusForEach((prevStatus) => {
      const newStatus = [...prevStatus]; // Create a copy of the previous state
      newStatus[item?.original?.id - 1] = value; // Update the specific index
      return newStatus; // Return the new array
    });
    const payload = {
      orderId: item?.original?.orderId,
      status: value,
    };
    const updateOrder = await UpdateOrder(payload);
    console.log("updateOrder", updateOrder);
    if (updateOrder?.success) {
      toast.success("Order status updated successfully");
      refetchOrders();
    }
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
        <Select
          onValueChange={(value) => handleUpdateStatus(value, row)}
          aria-label="Select action"
        >
          <SelectTrigger className="w-40 h-10 mt-1 border-0 capitalize">
            <SelectValue
              placeholder={
                statusForEach?.length > 0
                  ? statusForEach[row?.original?.id - 1]
                  : row?.original?.status
              }
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
    !isOrdersLoading && myorders?.data?.[activePage]?.length
      ? myorders.data[activePage].map((order, index) => ({
          id: index + 1,
          orderId: order.orderNumber,
          date: new Date(order.createdAt).toLocaleDateString(),
          totalPrice: `৳ ${order.totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          partialPayment: `৳ ${order.paymentDetails.partialPayment.toFixed(2)}`,
          items: order.items.length,
          paymentMethod: order.paymentDetails.paymentMethod,
          status: order.status,
        }))
      : [];

  console.log("ordersArray", ordersArray);

  return (
    <div className="flex flex-col gap-3">
      <p>{ordersArray?.length} Orders</p>
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
