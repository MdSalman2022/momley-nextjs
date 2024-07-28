"use client";

import { StateContext } from "@/contexts/StateProvider/StateProvider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsBag, BsCartPlus, BsDash, BsPlus } from "react-icons/bs";
import { FaMinus, FaPlus, FaStar, FaStarHalf } from "react-icons/fa";
import CartIcon from "../../../public/images/CartIcon.svg";
import laptop from "../../../public/images/products/laptop.webp";
import Image from "next/image";

const ProductCard = ({ book }) => {
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
        totalPrice: book.pricing.price * (cartCount ? cartCount : 1),
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

    const cartItem = cart.find((item) => item._id === book._id);
    if (cartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === book._id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: item.pricing.price * (item.quantity - 1),
          };
          return updatedItem;
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(cartCount - 1);
    }
  };

  const handlePlusClick = () => {
    const cartItem = cart.find((item) => item._id === book._id);
    if (cartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === book._id) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: item.pricing.price * (item.quantity + 1),
          };
          return updatedItem;
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartCount(cartCount + 1);
    } else {
      const newCartItem = {
        ...book,
        quantity: 1,
        totalPrice: book.pricing?.price,
      };
      setCart([...cart, newCartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
      setCartCount(1);
    }
  };
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (book && book.images && book.images.length > 0) {
      const firstImage = book.images[0];
      // console.log(firstImage);
      setImageUrl(firstImage);
    } else {
      setImageUrl(book?.image);
    }
  }, [book]);

  // console.log(imageUrl);

  console.log("book", book);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border border-[#EEEEEE80] p-3 rounded text-black">
      <Link href={`/book/${book?._id}`}>
        <Image
          className="object-cover w-[164px] h-[217px]"
          src={laptop}
          width={164}
          height={217}
        />
      </Link>
      <Link href={`/book/${book?._id}`}>
        <p className="font-semibold text-sm text-center">{book?.name}</p>
      </Link>
      <p className="text-sm">{book?.weight}</p>
      <p className="font-semibold ">৳ {book?.price}</p>
      <span className="flex items-center">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalf /> <span className="text-xs"> (05 reviews)</span>
      </span>
      {cartCount < 1 && (
        <div
          onClick={handleAddToCart}
          className="primary-outline-btn w-full flex justify-center gap-2 cursor-pointer"
        >
          <Image src={CartIcon} alt="" className="w-5 h-5" />
          Add to cart
        </div>
      )}
      {cartCount > 0 && (
        <div className="flex items-center gap-3">
          <button onClick={handleMinusClick} className="p-2 px-3 border">
            <FaMinus />
          </button>
          <span>{cartCount}</span>
          <button onClick={handlePlusClick} className="p-2 px-3 primary-btn">
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
