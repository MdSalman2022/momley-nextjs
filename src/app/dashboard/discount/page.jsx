"use client";
import useDiscount from "@/hooks/useDiscount";
import { storeId } from "@/libs/utils/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdEdit } from "react-icons/md";
import { useQuery } from "react-query";

const DiscountList = () => {
  const router = useRouter();
  const { getDiscountByStore } = useDiscount();
  const {
    data: getDiscounts = [],
    isLoading: isDiscountLoading,
    refetch: refetchDiscounts,
  } = useQuery({
    queryKey: ["getDiscounts", storeId],
    queryFn: () => storeId && getDiscountByStore(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  if (isDiscountLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Discounts</h1>
        <button
          onClick={() => router.push("/dashboard/discount/create")}
          className="primary-btn"
        >
          Create Discount Token
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getDiscounts.map((discount) => (
          <div
            key={discount._id}
            className="bg-white rounded-lg p-4 border border-gray-200 relative"
          >
            <Link
              href={`/dashboard/discount/edit/${discount.discountCode}`}
              className="transition-all duration-300 absolute top-3 right-3 border rounded-lg p-2 text-xl hover:bg-black hover:text-white cursor-pointer"
            >
              <MdEdit />
            </Link>
            <h2 className="text-xl font-semibold mb-2">
              Code: {discount.discountCode}
            </h2>
            <p className="text-gray-700 mb-2">
              Type: {discount.discountInfo.type}
            </p>
            <p className="text-gray-700 mb-2">
              Value: {discount.discountInfo.value}%
            </p>
            <p className="text-gray-700 mb-2">
              Applies To:{" "}
              {discount.discountInfo.appliesTo === "all-products"
                ? "All Products"
                : discount.discountInfo.appliesTo === "specific-collections"
                ? "Specific Collections"
                : "Specific Products"}
            </p>
            <p className="text-gray-700 mb-2">
              Minimum Amount: {discount.minimumRequirement.amount}
            </p>
            <p className="text-gray-700 mb-2">
              Start Time: {new Date(discount.startTimestamp).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">
              Start Time: {new Date(discount.endTimestamp).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">
              Total Usage Limit: {discount.usageLimits.totalUsageLimit}
            </p>
            <p className="text-gray-700 mb-2">
              Per Customer Usage Limit:{" "}
              {discount.usageLimits.perCustomerUsageLimit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountList;
