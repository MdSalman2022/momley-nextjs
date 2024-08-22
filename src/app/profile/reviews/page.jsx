"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useOrder from "@/hooks/useOrder";
import useReview from "@/hooks/useReview";
import { TruncateText } from "@/libs/utils/common";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
import { useQuery } from "react-query";

const MyReview = () => {
  const { userInfo } = useContext(StateContext);
  const { getOrderByStatus } = useOrder();
  const { createReview } = useReview();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("toBeReviewed");

  console.log("userInfo", userInfo);
  const customerId = userInfo?.customerId;
  const status = "delivered";

  const {
    data: completedOrders = {},
    isLoading: isCompletedOrdersLoading,
    refetch: refetchCompletedOrders,
  } = useQuery({
    queryKey: ["completedOrders", userInfo?.customerId, status],
    queryFn: () => getOrderByStatus(customerId, status),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("completedOrders", completedOrders);
  const reviewedOrders = completedOrders?.data?.reviewedOrders || [];
  const notReviewedOrders = completedOrders?.data?.notReviewedOrders || [];

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <p className="font-medium">My Reviews</p>
        {/* <button className="primary-btn">Save and Change</button> */}
      </div>
      <div className="flex justify-start space-x-4">
        <span
          className={`cursor-pointer rounded-lg ${
            activeTab === "toBeReviewed"
              ? "font-bold bg-black text-white p-2"
              : "p-2 border border-black"
          }`}
          onClick={() => setActiveTab("toBeReviewed")}
        >
          To be reviewed
        </span>
        <span
          className={`cursor-pointer rounded-lg ${
            activeTab === "history"
              ? "font-bold bg-black text-white p-2"
              : "p-2 border border-black"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </span>
      </div>
      <div className="mt-4">
        {activeTab === "toBeReviewed" &&
          notReviewedOrders?.map((order) => (
            <div
              key={order._id}
              className="border p-4 mb-4 rounded-lg grid grid-cols-2 relative"
            >
              <div className="mb-2">
                <strong>Order Number:</strong> {order.orderNumber}
              </div>
              <div className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <strong>Total Amount:</strong> ${order.totalAmount}
              </div>
              <div className="mb-2">
                <strong>Payment Method:</strong>{" "}
                {order.paymentDetails.paymentMethod}
              </div>
              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item._id}>
                      {item.productName} - {item.quantity} x ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {order.status}
              </div>

              <button
                className="primary-btn w-fit absolute right-5 bottom-5"
                onClick={() =>
                  router.push(`/profile/reviews/${order.orderNumber}`)
                }
              >
                Review
              </button>
            </div>
          ))}

        {activeTab === "history" &&
          reviewedOrders?.map((order) => (
            <div
              key={order._id}
              className="border p-4 mb-4 rounded-lg grid grid-cols-2 relative"
            >
              <div className="mb-2">
                <strong>Order Number:</strong> {order.orderNumber}
              </div>
              <div className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <strong>Total Amount:</strong> ${order.totalAmount}
              </div>
              <div className="mb-2">
                <strong>Payment Method:</strong>{" "}
                {order.paymentDetails.paymentMethod}
              </div>
              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={item._id}>
                      {TruncateText(item.productName, 20)} - {item.quantity} x $
                      {item.price}
                      {" - "}
                      {<span>{order?.reviewIds[index]?.rating} Star</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {order.status}
              </div>

              <button
                className="primary-btn w-fit absolute right-5 bottom-5"
                onClick={() =>
                  router.push(`/profile/reviews/${order.orderNumber}`)
                }
              >
                Check
              </button>
            </div>
          ))}
      </div>

      {/*    <div className="border bg-white p-5 space-y-5">
        <p className="font-semibold py-2 border-b-2 border-black w-fit">
          Your orders rating & review:
        </p>

        <div>
          <div className="flex">
            <div className="flex gap-5">
              <img
                className="h-20"
                src="https://i.ibb.co/VJJW1pv/image.png"
                alt=""
              />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <p>ABC</p>
                      <small>Writer: Dummy writer</small>
                      <div className="flex gap-3 items-center">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStarHalfAlt className="text-yellow-500" />
                        </div>
                        <p>Good Product</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start gap-5">
                      <small>Purchased on 19 April 2020</small>
                      <div className="flex items-center justify-end gap-5 text-xl">
                        <AiTwotoneLike />
                        <AiTwotoneDislike />
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="input-box h-fit w-full p-3"
                    name=""
                    id=""
                    cols="90"
                    rows="5"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyReview;
