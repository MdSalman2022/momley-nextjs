"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useCart from "@/hooks/useCart";
import { storeId } from "@/libs/utils/common";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export default function BookCartControl({ bookDetails }) {
  const { userInfo, cartInfo, refetchCartInfo, isCartInfoLoading } =
    useContext(StateContext);
  const { handleAddToCart, handlePlusClick, handleMinusClick } = useCart();

  const [productCartCount, setProductCartCount] = useState(0);

  useEffect(() => {
    if (cartInfo?.length > 0) {
      setProductCartCount(
        cartInfo?.find(
          (product) => (product._id || product.productId) === bookDetails._id
        )?.quantity
      );
    }
  }, [cartInfo]);

  console.log("productCartCount", productCartCount);

  const alreadyInCart =
    cartInfo?.length > 0 &&
    cartInfo?.find((item) => item._id === bookDetails._id);

  if (isCartInfoLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:gap-3">
      <div className="md:hidden fixed bottom-0 left-0 px-4 py-4 w-full flex items-center justify-center">
        {alreadyInCart ? (
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center bg-red-600 h-12 text-white w-1/2 text-3xl rounded-full">
              <MdOutlineDelete />
            </div>
            <div className="w-1/2 flex items-center justify-between font-medium cursor-pointer h-[50px] bg-[#111111] text-white rounded-full">
              <button
                onClick={() =>
                  handleMinusClick(
                    bookDetails,
                    userInfo,
                    cartInfo,
                    productCartCount,
                    setProductCartCount,
                    refetchCartInfo
                  )
                }
                className="h-full w-full flex justify-center items-center border-r border-gray-300"
              >
                <FaMinus />
              </button>
              <span className="w-full flex justify-center items-center text-lg">
                {productCartCount}
              </span>
              <button
                onClick={() =>
                  handlePlusClick(
                    bookDetails,
                    userInfo,
                    cartInfo,
                    productCartCount,
                    setProductCartCount,
                    refetchCartInfo
                  )
                }
                className="h-full w-full flex justify-center items-center border-l border-gray-300"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() =>
              !alreadyInCart &&
              handleAddToCart(
                bookDetails,
                userInfo,
                setProductCartCount,
                refetchCartInfo
              )
            }
            className={`w-full flex items-center justify-center font-medium cursor-pointer h-[50px] bg-[#111111] text-white rounded-full`}
          >
            Add to Cart
          </div>
        )}
      </div>

      <p className="hidden md:block">Quantity</p>
      <div className="hidden md:flex items-center gap-3 border w-fit h-9">
        <button
          onClick={() =>
            handleMinusClick(
              bookDetails,
              userInfo,
              cartInfo,
              productCartCount,
              setProductCartCount,
              refetchCartInfo
            )
          }
          className="h-full w-10 flex justify-center items-center border-r"
        >
          <FaMinus />
        </button>
        <span className="w-6 flex justify-center">{productCartCount}</span>
        <button
          onClick={() =>
            handlePlusClick(
              bookDetails,
              userInfo,
              cartInfo,
              productCartCount,
              setProductCartCount,
              refetchCartInfo
            )
          }
          className="h-full w-10 flex justify-center items-center text-white bg-[#4F4F4F]"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex gap-5">
        <div
          onClick={() =>
            !alreadyInCart &&
            handleAddToCart(
              bookDetails,
              userInfo,
              setProductCartCount,
              refetchCartInfo
            )
          }
          className={`w-40 hidden md:flex items-center justify-center font-semibold ${
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
          className="primary-btn w-40 hidden md:flex justify-center cursor-pointer"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
