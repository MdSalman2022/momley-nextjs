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

const ProductCard = React.memo(({ book }) => {
  const { userInfo, storeInfo, cartInfo, refetchCartInfo } =
    useContext(StateContext);
  const { AddToCart } = useCart();

  // console.log("storeInfo", storeInfo);

  const [productCartCount, setProductCartCount] = useState(0);

  useEffect(() => {
    if (cartInfo?.length > 0) {
      setProductCartCount(
        cartInfo?.find((product) => product._id === book._id)?.quantity
      );
    }
  }, [cartInfo]);

  const handleAddToCart = async () => {
    console.log("check stock", book?.stock?.quantity);
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
      quantity: 1,
    };

    const response = await AddToCart(payload);

    if (response?.success) {
      refetchCartInfo();
      setProductCartCount(1);
    }
  };

  const handleMinusClick = async () => {
    if (productCartCount <= 1) {
      return;
    }
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: book._id,
      quantity: productCartCount - 1,
    };

    const response = await AddToCart(payload);

    if (response?.success) {
      refetchCartInfo();
      setProductCartCount((prevCount) => prevCount - 1);
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

    const response = await AddToCart(payload);

    if (response?.success) {
      refetchCartInfo();
      setProductCartCount((prevCount) => prevCount + 1);
    }
  };

  const productCloudfrontUrl = storeInfo?.cloudFrontURL;

  const truncatedText = TruncateText(book?.name, 15);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border border-[#EEEEEE80] p-3 rounded text-black max-w-[180px] h-fit">
      <Link
        href={`/product/${book?.slug}`}
        className="w-[164px] h-[217px] flex items-center justify-center"
      >
        {book?.images?.length > 0 && (
          <Image
            className="object-contain"
            src={productCloudfrontUrl?.replace(
              "*",
              `products/${book?.images[0]}`
            )}
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
        <div
          onClick={handleAddToCart}
          className="primary-outline-btn w-full flex justify-center gap-2 cursor-pointer"
        >
          <Image src={CartIcon} alt="" className="w-5 h-5" />
          Add to cart
        </div>
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
