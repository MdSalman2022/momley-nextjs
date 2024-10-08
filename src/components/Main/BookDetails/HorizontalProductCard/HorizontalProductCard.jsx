"use client";
import React, { useContext, useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus, FaStar, FaStarHalf } from "react-icons/fa";
import { StateContext } from "../../../../contexts/StateProvider/StateProvider";
import CartIcon from "../../../../../public/images/CartIcon.svg";
import Image from "next/image";

const HorizontalProductCard = ({ book }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cartInfo.forEach((item) => {
      if (item._id === book._id) {
        count += item.quantity;
      }
    });
    setCartCount(count);
  }, [cartInfo]);

  const handleAddToCart = () => {
    const cartItem = cartInfo.find((item) => item._id === book._id);

    if (cartItem) {
      const updatedCart = cartInfo.map((item) => {
        if (item._id === book._id) {
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
      localStorage.setItem("cartInfo", JSON.stringify(updatedCart));
      setCartCount(cartCount ? cartCount : cartItem.quantity + 1);
    } else {
      const newCartItem = {
        ...book,
        quantity: cartCount ? cartCount : 1,
        totalPrice: book.salePrice * (cartCount ? cartCount : 1),
      };
      localStorage.setItem(
        "cartInfo",
        JSON.stringify([...cartInfo, newCartItem])
      );
      setCartCount(cartCount ? cartCount : 1);
    }
  };
  const handleMinusClick = () => {
    if (cartCount === 0) {
      return; // do not update cartCount if it's already 0
    }

    const updatedCart = cartInfo.map((item) => {
      if (item._id === book._id) {
        const newQuantity = item.quantity - 1;
        const newTotalPrice =
          item.salePrice * (newQuantity < 1 ? 1 : newQuantity);
        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity,
          totalPrice: newTotalPrice,
        };
      }
      return item;
    });

    localStorage.setItem("cartInfo", JSON.stringify(updatedCart));
    setCartCount(cartCount - 1);
  };

  const handlePlusClick = () => {
    const updatedCart = cartInfo.map((item) => {
      if (item._id === book._id) {
        const newQuantity = item.quantity + 1;
        const newTotalPrice = item.salePrice * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        };
      }
      return item;
    });

    localStorage.setItem("cartInfo", JSON.stringify(updatedCart));
    setCartCount(cartCount + 1);
  };

  return (
    <div className="rounded p-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col justify-between gap-3">
          <img
            className="object-contain h-32"
            src={book?.images[0]}
            alt={book?.name}
          />
          <div className="flex items-center rounded-sm justify-between border border-[#E0E0E0]">
            <span
              onClick={handleMinusClick}
              className="flex items-center rounded-sm-l bg-[#F4F0F5] border-[#E0E0E0] justify-center w-12 h-10 border-r"
            >
              <FaMinus />
            </span>
            <span className="flex items-center justify-center w-12 h-10 bg-[#F4F0F5]">
              {cartCount}
            </span>
            <span
              onClick={handlePlusClick}
              className="flex items-center rounded-sm-r border-[#E0E0E0] justify-center bg-gray-500 text-white w-12 h-10 border-l"
            >
              <FaPlus />
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between col-span-2 gap-3">
          <div className="flex flex-col justify-between h-full">
            <p>{book?.name}</p>

            <div className="flex flex-col">
              <p>Price: {book?.pricing?.price}</p>
              <span className="flex items-center text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />{" "}
                <span className="text-xs text-black">(15 reviews)</span>
              </span>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="primary-outline-btn flex items-center justify-center rounded-[4px] gap-2 border-[#333333] h-10"
          >
            <Image src={CartIcon} className="w-5 h-5 object-contain" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
