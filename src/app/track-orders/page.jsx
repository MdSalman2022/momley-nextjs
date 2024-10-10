"use client";
import React, { useState } from "react";
import useOrder from "@/hooks/useOrder";
import { DataTable } from "@/libs/utils/data-table";
import { useQuery } from "react-query";
import { Checkbox } from "@/components/ui/checkbox";

const getFilteredOrders = (orders, status) => {
  switch (status) {
    case "all":
      return orders?.data?.all || [];
    case "cancelled":
      return orders?.data?.cancelled || [];
    case "delivered":
      return orders?.data?.delivered || [];
    case "pending":
      return orders?.data?.pending || [];
    case "processing":
      return orders?.data?.processing || [];
    case "return_refund":
      return orders?.data?.return_refund || [];
    case "shipped":
      return orders?.data?.shipped || [];
    default:
      return [];
  }
};

const TrackOrders = () => {
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
      id: "status",
      header: "status",
      accessorKey: "status", // Assuming actions are tied to the row's unique 'id'
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const actions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "return_refund", label: "Return/Refund" },
  ];
  const [activePage, setActivePage] = useState(actions[0]?.value);
  const [phone, setPhone] = useState("");

  const { getAllOrderByPhone } = useOrder();
  const {
    data: orders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => phone && getAllOrderByPhone(phone),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const filteredOrders = getFilteredOrders(orders, activePage);

  const ordersArray =
    !isOrdersLoading && filteredOrders.length
      ? filteredOrders.map((order, index) => ({
          id: index + 1,
          orderId: order.orderNumber,
          date: new Date(order.createdAt).toLocaleDateString(),
          totalPrice: `$${order.totalAmount.toFixed(2)}`,
          partialPayment: `$${order.paymentDetails.partialPayment.toFixed(2)}`,
          status: <p className="capitalize">{order.status}</p>,
        }))
      : [];

  const data = ordersArray;

  return (
    <div className="flex flex-col items-center gap-10 min-h-screen">
      <h1 className="text-5xl font-semibold text-center">Track Your Order</h1>
      <span className="flex flex-col w-fit">
        <label htmlFor="Phone" className="text-sm">
          Phone Number
        </label>
        <div className="flex items-center gap-1">
          <input
            type="tel"
            placeholder="Enter your phone"
            className="input-box w-60 h-10"
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type="button"
            onClick={() => refetchOrders()}
            className="primary-btn h-10"
          >
            Search
          </button>
        </div>
      </span>
      {data?.length > 0 && (
        <div className="w-full">
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
      )}
    </div>
  );
};

export default TrackOrders;
