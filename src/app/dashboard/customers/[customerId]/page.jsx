"use client";
import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useOrder from "@/hooks/useOrder";
import { useQuery } from "react-query";
import { formatDate } from "@/libs/utils/common";
import Link from "next/link";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";

const CustomerProfile = ({ params }) => {
  const { getAllOrderByUser } = useOrder();

  const customerId = params.customerId;

  const {
    data: orders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders", customerId],
    queryFn: () => customerId && getAllOrderByUser(customerId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("orders", orders);

  const customer = orders?.data?.customer || {};

  const orderTypes = [
    {
      id: 1,
      name: "All",
      value: "all",
    },
    {
      id: 2,
      name: "Pending",
      value: "pending",
    },
    {
      id: 3,
      name: "Accepted",
      value: "accepted",
    },
    {
      id: 4,
      name: "Shipped",
      value: "shipped",
    },
    {
      id: 5,
      name: "Delivered",
      value: "delivered",
    },
    {
      id: 6,
      name: "Cancelled",
      value: "cancelled",
    },
    {
      id: 7,
      name: "Return/Refund",
      value: "return_refund",
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "flex items-center h-8  text-xs rounded-full border border-blue-600 text-blue-600 capitalize px-2 rounded";
      case "accepted":
        return "flex items-center h-8  text-xs rounded-full border border-indigo-600 text-indigo-600 capitalize px-2 rounded";
      case "shipped":
        return "flex items-center h-8  text-xs rounded-full border border-yellow-600 text-yellow-600 capitalize px-2 rounded";
      case "delivered":
        return "flex items-center h-8  text-xs rounded-full border border-green-600 text-green-600 capitalize px-2 rounded";
      case "cancelled":
        return "flex items-center h-8  text-xs rounded-full border border-red-600 text-red-600 capitalize px-2 rounded";
      case "return_refund":
        return "flex items-center h-8  text-xs rounded-full border border-purple-600 text-purple-600 capitalize px-2 rounded";
      default:
        return "flex items-center h-8  text-xs rounded-full border border-gray-600 text-gray-600 capitalize px-2 rounded";
    }
  };
  const [activePage, setActivePage] = useState(orderTypes[0]?.value);

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

  const filteredOrders = getFilteredOrders(orders, activePage);

  console.log("filteredOrders", filteredOrders);

  if (isOrdersLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col mt-4 gap-10">
      <div className="border rounded-lg p-4 grid grid-cols-2 w-full">
        <div className="col-span-2">
          <p className="font-semibold">Customer details</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <p>{customer?.firstName}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="email">
              Email address
            </label>
            <p>{customer?.userId?.email}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="name">
              Mobile number
            </label>
            <p>{customer?.phoneNumber}</p>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="email">
              City
            </label>
            <p>
              {customer?._id &&
                customer?.shippingAddress?.length > 0 &&
                customer?.shippingAddress[customer?.shippingAddress?.length - 1]
                  ?.city}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-2xl font-semibold">All Orders</p>
        <div className="flex">
          <div className="w-full">
            <TabGroup>
              <TabList className="flex gap-4">
                {orderTypes.map(({ name, value }) => (
                  <Tab
                    key={name}
                    onClick={() => setActivePage(value)}
                    className="rounded-full py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-black"
                  >
                    {name}
                  </Tab>
                ))}
              </TabList>
            </TabGroup>
            <div className="flex gap-3 flex-wrap w-full mt-5">
              {filteredOrders.map((order) => (
                <div
                  key={order?.orderNumber}
                  className="transition-all duration-300 hover:scale-105 cursor-pointer bg-white p-4 rounded-lg border w-80 hover:border-blue-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <Link
                      href={`
                      /dashboard/orders/${order?.orderNumber}
                      `}
                      className="text-lg font-semibold"
                    >
                      #{order?.orderNumber}
                    </Link>
                    <span className="text-sm text-gray-500">
                      {formatDate(order?.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">
                      Items: {order?.items.length}
                    </span>
                    <span className="text-sm text-gray-700">
                      Total: ${order?.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">
                      Payment: {order?.paymentDetails?.paymentMethod}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={getStatusStyles(order?.status)}>
                      {order?.status}
                    </span>
                    <Link
                      href={`
                      /dashboard/orders/${order?.orderNumber}
                      `}
                      className="primary-btn"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
