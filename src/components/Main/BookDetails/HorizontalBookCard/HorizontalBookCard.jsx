"use client";
import React, { useContext, useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { FaMinus, FaPlus, FaStar, FaStarHalf } from "react-icons/fa";
import { StateContext } from "../../../../contexts/StateProvider/StateProvider";

const HorizontalBookCard = ({ book }) => {
  const { cart, setCart } = useContext(StateContext);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cartData.forEach((item) => {
      if (item._id === book._id) {
        count += item.quantity;
      }
    });
    setCartCount(count);
  }, [cart]);

  const handleAddToCart = () => {
    const cartItem = cart.find((item) => item._id === book._id);

    if (cartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === book._id) {
          const updatedItem = {
            ...item,
            quantity: cartCount ? cartCount : item.quantity + 1,
            totalPrice:
              item.price * (cartCount ? cartCount : item.quantity + 1),
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
        ...book,
        quantity: cartCount ? cartCount : 1,
        totalPrice: book.price * (cartCount ? cartCount : 1),
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
    <div className="border rounded p-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col justify-between gap-3">
          <img
            className="object-contain h-32"
            src={book?.images[0]}
            alt={book?.name}
          />
          <div className="flex items-center rounded-sm justify-between border border-black">
            <span
              onClick={handleMinusClick}
              className="flex items-center rounded-sm-l border-black justify-center w-12 h-10 border-r"
            >
              <FaMinus />
            </span>
            <span className="flex items-center justify-center w-12 h-10 ">
              {cartCount}
            </span>
            <span
              onClick={handlePlusClick}
              className="flex items-center rounded-sm-r border-black justify-center bg-gray-500 text-white w-12 h-10 border-l"
            >
              <FaPlus />
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between col-span-2 gap-3">
          <div className="flex flex-col justify-between h-full">
            <p>{book?.name}</p>

            <div className="flex flex-col">
              <p>Price: {book?.price}</p>
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
            className="primary-outline-btn flex items-center justify-center rounded-sm"
          >
            <BsCartPlus className="text-xl" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBookCard;
