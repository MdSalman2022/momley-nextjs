"use client";
import useOrder from "@/hooks/useOrder";
import useProduct from "@/hooks/useProduct";
import { storeId } from "@/libs/utils/common";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery } from "react-query";

const Reviews = () => {
  const route = useRouter();
  const { getReviewedOrderByStore } = useOrder();
  const { GetReviewedProducts } = useProduct();

  const [activeTab, setActiveTab] = useState("ordersReview");
  const {
    data: myorders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["myorders", storeId],
    queryFn: () => storeId && getReviewedOrderByStore(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });
  const {
    data: myproducts = {},
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["myproducts", storeId],
    queryFn: () => storeId && GetReviewedProducts(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("myorders", myorders);
  console.log("myproducts", myproducts);
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    return (totalRating / reviews.length).toFixed(2); // Keeping two decimal places
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="flex justify-start space-x-4">
        <span
          className={`cursor-pointer rounded-lg ${
            activeTab === "ordersReview"
              ? "font-bold bg-black text-white p-2"
              : "p-2 border border-black"
          }`}
          onClick={() => setActiveTab("ordersReview")}
        >
          Review By Order
        </span>
        <span
          className={`cursor-pointer rounded-lg ${
            activeTab === "productsReview"
              ? "font-bold bg-black text-white p-2"
              : "p-2 border border-black"
          }`}
          onClick={() => setActiveTab("productsReview")}
        >
          Review By Product
        </span>
      </div>
      <div className="flex flex-col">
        {activeTab === "ordersReview"
          ? myorders?.data?.map((order) => (
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
                    route.push(`/profile/reviews/${order.orderNumber}`)
                  }
                >
                  Check
                </button>
              </div>
            ))
          : myproducts?.data?.map((order) => (
              <div
                key={order._id}
                className="border p-4 mb-4 rounded-lg grid grid-cols-2 relative"
              >
                <div className="mb-2">
                  <strong>Product Name:</strong> {order.name}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="mb-2">
                  <strong>Sale Price:</strong> ${order.salePrice}
                </div>
                <div className="mb-2">
                  <strong>Color:</strong> {order.color}
                </div>
                <div className="mb-2">
                  <strong>Status:</strong>{" "}
                  {order.stock?.inStock ? "In Stock" : "Out of Stock"}
                </div>
                <div className="mb-2">
                  <strong>Rating:</strong>{" "}
                  {calculateAverageRating(order.reviews)}
                </div>

                <button
                  className="primary-btn w-fit absolute right-5 bottom-5"
                  onClick={() => route.push(`/dashboard/reviews/${order.slug}`)}
                >
                  Check
                </button>
              </div>
            ))}
      </div>
      {/* <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{review.productName}</h3>
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.reviewerName}</span>
              <span className="text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Reviews;
