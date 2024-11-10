"use client";

import { StateContext } from "@/contexts/StateProvider/StateProvider";
import Link from "next/link";
import { useContext, useCallback, useState, useEffect } from "react";
import { FaMinus, FaPlus, FaStar, FaStarHalf } from "react-icons/fa";
import CartIcon from "../../../public/images/CartIcon.svg";
import Image from "next/image";
import { storeId, TruncateText } from "@/libs/utils/common";
import useCart from "@/hooks/useCart";
import React from "react";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "@/libs/utils/cookieUtils";

const ProductCard = React.memo(({ book }) => {
  const { userInfo, storeInfo, cartInfo, refetchCartInfo } =
    useContext(StateContext);
  const { AddToCart, handleRemoveFromCart } = useCart();

  // console.log("storeInfo", storeInfo);

  const [productCartCount, setProductCartCount] = useState(0);

  console.log("cartInfo", cartInfo);
  console.log("productCartCount", productCartCount);

  useEffect(() => {
    if (cartInfo?.length > 0) {
      setProductCartCount(
        cartInfo?.find(
          (product) => (product._id || product.productId) === book._id
        )?.quantity
      );
    }
  }, [cartInfo]);

  const handleAddToCart = async () => {
    console.log("check stock", book?.stock?.quantity);

    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: book._id,
      quantity: 1,
    };

    // Check if the user is logged in
    if (userInfo?._id) {
      // User is logged in, send request to the server
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCartInfo();
        setProductCartCount(1);
        toast.success("Product added to cart!");
      }
    } else {
      const cartKey = "userCart"; // Define a key for the cart in cookies

      // Get existing cart from cookies or create a new one
      const existingCart = JSON.parse(getCookie(cartKey) || "[]");

      // Update cart with the new product
      const updatedCart = existingCart.map((product) =>
        product._id === book._id
          ? { productId: book?._id, quantity: product.quantity + 1 } // Update quantity if exists
          : product
      );

      // If product doesn't exist in the cart, add it
      if (!existingCart.some((product) => product._id === book._id)) {
        updatedCart.push({
          productId: book?._id,
          storeId: storeId,
          quantity: 1,
        });
      }
      console.log("updatedCart", updatedCart);

      // Store updated cart back to cookies
      setCookie(cartKey, JSON.stringify(updatedCart), 7); // Store for 7 days

      // Update product cart count in state

      setProductCartCount(1);
      refetchCartInfo();
      toast.success("Product added to cart!");

      // Check if the user is logged in
    }
  };

  const handlePlusClick = async () => {
    if (
      cartInfo?.find((product) => product._id === book._id)?.quantity >=
      book?.stock?.quantity
    ) {
      toast.error("Product out of stock");
      return;
    }
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: book._id,
      quantity: productCartCount + 1,
    };

    if (userInfo?._id) {
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCartInfo();
        setProductCartCount((prevCount) => prevCount + 1);
      }
    } else if (productCartCount < book?.stock?.quantity) {
      const cartKey = "userCart";

      const existingCart = JSON.parse(getCookie(cartKey) || "[]");
      console.log("existingCart", existingCart);
      const updatedCart = existingCart.map((product) =>
        product.productId === book._id
          ? {
              productId: book._id,
              quantity: product.quantity + 1,
              storeId: storeId,
            }
          : product
      );

      setCookie(cartKey, JSON.stringify(updatedCart), 7);

      setProductCartCount((prevCount) => prevCount + 1);
    }
  };

  const handleMinusClick = async () => {
    if (productCartCount <= 1) {
      handleRemoveFromCart(book, userInfo, cartInfo);
      setProductCartCount(0);
      refetchCartInfo();
      return;
    }

    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: book._id,
      quantity: productCartCount - 1,
    };

    if (userInfo?._id) {
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCartInfo();
        setProductCartCount((prevCount) => prevCount - 1);
      }
    } else if (productCartCount > 1) {
      const cartKey = "userCart";

      const existingCart = JSON.parse(getCookie(cartKey) || "[]");
      console.log("existingCart", existingCart);

      const updatedCart = existingCart.map((product) =>
        product.productId === book._id
          ? {
              productId: book._id,
              quantity: product.quantity - 1,
              storeId: storeId,
            }
          : product
      );

      setCookie(cartKey, JSON.stringify(updatedCart), 7);

      setProductCartCount((prevCount) => prevCount - 1);
    }
  };

  const productCloudfrontUrl = storeInfo?.cloudFrontURL;

  const truncatedText = TruncateText(book?.name, 15);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border border-[#EEEEEE80] md:p-3 rounded text-black md:max-w-[180px] h-fit">
      <Link
        href={`/product/${book?.slug}`}
        className="w-[164px] h-[217px] flex items-center justify-center"
      >
        {book?.images?.length > 0 && (
          <Image
            className="object-contain"
            src={productCloudfrontUrl?.replace(
              "*",
              `products/${book?.images[0]?.replace(
                /\.[^/.]+$/,
                "600by400.webp"
              )}`
            )}
            onError={(e) => {
              e.target.src = productCloudfrontUrl?.replace(
                "*",
                `products/${book?.images[0]}`
              );
            }}
            alt={book?.name}
            width={164}
            height={217}
          />
        )}
      </Link>
      <div className="flex flex-col items-center gap-1">
        <Link href={`/product/${book?.slug}`}>
          <p className="font-semibold text-sm text-center">{truncatedText}</p>
        </Link>
        <p className="font-semibold ">৳ {book?.salePrice}</p>
        <span className="flex items-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalf />{" "}
          <span className="text-xs"> ({book?.reviews?.length} reviews)</span>
        </span>
      </div>
      {(productCartCount < 1 || productCartCount === undefined) && (
        <button
          type="button"
          onClick={handleAddToCart}
          className={`primary-outline-btn w-full flex justify-center gap-2  ${
            book?.stock?.quantity === 0
              ? "opacity-20 cursor-not-allowed hover:bg-white hover:text-black"
              : "cursor-pointer"
          }`}
          disabled={book?.stock?.quantity === 0}
        >
          <Image src={CartIcon} alt="cart" className="w-5 h-5" />
          {book?.stock?.quantity === 0 ? "Out of stock" : "Add to cart"}
        </button>
      )}
      {productCartCount > 0 && (
        <div className="flex items-center gap-3">
          <button onClick={handleMinusClick} className="p-2 px-3 border">
            <FaMinus />
          </button>
          <span>{productCartCount}</span>
          <button onClick={handlePlusClick} className="p-2 px-3 primary-btn">
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
});

export default ProductCard;
