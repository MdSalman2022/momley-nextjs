"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { storeId } from "@/libs/utils/common";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function BookCartControl({ bookDetails }) {
  const { userInfo, cartInfo, isCartInfoLoading } = useContext(StateContext);

  const productCartCount =
    cartInfo?.length > 0
      ? cartInfo?.find((product) => product._id === bookDetails._id)?.quantity
      : 0;

  console.log("productCartCount", productCartCount);

  const handleAddToCart = async () => {
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: bookDetails._id,
      quantity: 1,
    };

    const response = await AddToCart(payload);

    if (response?.success) {
      refetchCartInfo();
    }
  };
  const handleMinusClick = async () => {
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: bookDetails._id,
      quantity: productCartCount - 1,
    };

    const response = await AddToCart(payload);

    if (response?.success) {
      refetchCartInfo();
    }
  };

  const handlePlusClick = async () => {
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: bookDetails._id,
      quantity: productCartCount + 1,
    };

    const response = await AddToCart(payload);

    if (response?.success) {
      refetchCartInfo();
    }
  };

  const alreadyInCart =
    cartInfo?.length > 0 &&
    cartInfo?.find((item) => item._id === bookDetails._id);

  if (isCartInfoLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <p>Quantity</p>
      <div className="flex items-center gap-3 border w-fit h-9">
        <button
          onClick={handleMinusClick}
          className="h-full w-10 flex justify-center items-center border-r"
        >
          <FaMinus />
        </button>
        <span className="w-6 flex justify-center">{productCartCount}</span>
        <button
          onClick={handlePlusClick}
          className="h-full w-10 flex justify-center items-center text-white bg-[#4F4F4F]"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex gap-5">
        <div
          onClick={() => !alreadyInCart && handleAddToCart}
          className={`w-40 flex items-center justify-center font-semibold ${
            alreadyInCart
              ? "text-gray-400 border-0 cursor-not-allowed"
              : "primary-outline-btn cursor-pointer"
          }`}
        >
          {cartInfo?.length > 0 &&
          cartInfo?.find((item) => item._id === bookDetails._id)
            ? "In Cart"
            : "Add to Cart"}
        </div>
        <Link
          href="/checkout"
          className="primary-btn w-40 flex justify-center cursor-pointer"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
