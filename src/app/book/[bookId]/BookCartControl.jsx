"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function BookCartControl() {
  const { cart, setCart } = useContext(StateContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cartData.forEach((item) => {
      if (item._id === bookDetails._id) {
        count += item.quantity;
      }
    });
    setCartCount(count);
  }, [cart]);

  const handleAddToCart = () => {
    const cartItem = cart.find((item) => item._id === bookDetails._id);

    if (cartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === bookDetails._id) {
          const updatedItem = {
            ...item,
            quantity: cartCount ? cartCount : item.quantity + 1,
            totalPrice:
              item.pricing.price * (cartCount ? cartCount : item.quantity + 1),
          };
          return updatedItem;
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(cartCount ? cartCount : cartItem.quantity + 1);
    } else {
      const newCartItem = {
        ...bookDetails,
        quantity: cartCount ? cartCount : 1,
        totalPrice: bookDetails.price * (cartCount ? cartCount : 1),
      };
      setCart([...cart, newCartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
      setCartCount(cartCount ? cartCount : 1);
    }
  };

  const handleMinusClick = () => {
    if (cartCount === 0) {
      return; // do not update cartCount if it's already 0
    }
    setCartCount(cartCount - 1);
  };

  const handlePlusClick = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="flex flex-col">
      {" "}
      <p>Quantity</p>
      <div className="flex items-center gap-3">
        <button onClick={handleMinusClick} className="p-2 px-3 border">
          <FaMinus />
        </button>
        <span>{cartCount}</span>
        <button onClick={handlePlusClick} className="p-2 px-3 primary-btn">
          <FaPlus />
        </button>
      </div>
      <div className="flex gap-5">
        <div
          onClick={handleAddToCart}
          className="primary-outline-btn w-40 flex justify-center"
        >
          Add to cart
        </div>
        <Link href="/checkout" className="primary-btn w-40 flex justify-center">
          Buy Now
        </Link>
      </div>
    </div>
  );
}
