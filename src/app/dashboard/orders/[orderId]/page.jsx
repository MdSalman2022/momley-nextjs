"use client";
import useOrder from "@/hooks/useOrder";
import React from "react";
import { useQuery } from "react-query";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const OrderDetailsPage = ({ params }) => {
  const { getOrdersByOrderNumber } = useOrder();
  const {
    data: orderDetails = {},
    isLoading: isOrderDetailsLoading,
    refetch: refetchOrderDetails,
  } = useQuery({
    queryKey: ["orderDetails", params?.orderId],
    queryFn: () => getOrdersByOrderNumber(params?.orderId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("orderDetails", orderDetails);

  const order = orderDetails.data;
  console.log("order", order);
  const downloadReceipt = () => {
    // Logic to download the invoice
    alert("Downloading receipt...");
  };

  const cloudFrontURL = order?.cloudFrontURL;

  const shippingAddress =
    order?.customerDetails?.shippingAddress[0]?.street +
    ", " +
    order?.customerDetails?.shippingAddress[0]?.city +
    ", " +
    order?.customerDetails?.shippingAddress[0]?.state;

  return (
    <div className="container mx-auto p-6 flex flex-col gap-5">
      {/* Top Card */}
      <div className="flex flex-col gap-5 bg-white rounded-lg border">
        <div className="flex justify-between items-center border-b p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Order #{order?.orderNumber}
              <p className="text-sm  bg-green-600/40 w-fit rounded-full px-2 text-white font-semibold">
                {order?.paymentDetails.paymentMethod}
              </p>
            </h2>
            <span className="text-sm text-gray-500">
              {formatDate(order?.createdAt)}
            </span>
          </div>
          <button
            onClick={downloadReceipt}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Download Receipt
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-6">
            <span className="text-sm text-gray-600">
              Items: {order?.items.length}
            </span>
          </div>
          {/* Items List */}
          <div className="mb-4">
            {order?.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-4 px-6"
              >
                <div className="flex items-center">
                  <img
                    src={cloudFrontURL.replace(
                      "*",
                      `products/${item.productDetails?.images[0]}`
                    )}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      SKU ID: {item.product}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 border border-green-500 text-green-700 w-5 h-5 flex items-center justify-center rounded">
                        {item.quantity}
                      </span>
                      <span>x</span>
                      <span>৳{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-6">
              <p className="text-lg text-gray-600 ">Subtotal</p>
              <p className="text-lg text-gray-600 font-semibold ">
                ৳{order?.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between px-6">
              <p className="text-lg text-gray-600 ">Delivery</p>
              <p className="text-lg text-gray-600 font-semibold ">
                ৳{order?.shippingCost.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between p-6 border-t">
              <p className="text-lg text-gray-600 ">Total</p>
              <p className="text-lg text-gray-600 font-semibold ">
                ৳{(order?.totalAmount + order?.shippingCost).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Card */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Details
        </h2>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-3 col-span-1">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700" htmlFor="name">
                Name
              </label>
              <p>{order?.customerDetails?.firstName}</p>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-700" htmlFor="Address">
                Address
              </label>
              <p>{shippingAddress}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 col-span-1">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700" htmlFor="phone">
                Phone
              </label>
              <p>{order?.customerDetails?.phoneNumber}</p>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700" htmlFor="Payment">
                Payment
              </label>
              <p>{order?.paymentDetails?.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
