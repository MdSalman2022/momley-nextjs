"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function BookCartControl({ bookDetails }) {
  const { cart, setCart } = useContext(StateContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItem = cart.find((item) => item._id === bookDetails._id);
    if (cartItem) {
      setCartCount(cartItem.quantity);
    } else {
      setCartCount(0);
    }
  }, [cart, bookDetails._id]);

  const handleAddToCart = () => {
    const cartItem = cart.find((item) => item._id === bookDetails._id);

    if (cartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === bookDetails._id) {
          const updatedItem = {
            ...item,
            quantity: cartCount ? cartCount : item.quantity + 1,
            totalPrice:
              item.salePrice * (cartCount ? cartCount : item.quantity + 1),
          };
          return updatedItem;
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    } else {
      const newCartItem = {
        ...bookDetails,
        quantity: cartCount ? cartCount : 1,
        totalPrice: bookDetails.salePrice * (cartCount ? cartCount : 1),
      };
      setCart([...cart, newCartItem]);
    }
    setCartCount(0);
  };

  const handleMinusClick = () => {
    if (cartCount === 0) {
      return;
    }
    setCartCount(cartCount - 1);
  };

  const handlePlusClick = () => {
    setCartCount(cartCount + 1);
  };

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
        <span className="w-6 flex justify-center">{cartCount}</span>
        <button
          onClick={handlePlusClick}
          className="h-full w-10 flex justify-center items-center text-white bg-[#4F4F4F]"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex gap-5">
        <div
          onClick={handleAddToCart}
          className="primary-outline-btn w-40 flex justify-center cursor-pointer"
        >
          {cart?.find((item) => item._id === bookDetails._id)
            ? "Update Cart"
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
