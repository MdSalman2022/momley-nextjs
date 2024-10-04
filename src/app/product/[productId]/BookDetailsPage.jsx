"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMinus,
  FaPlus,
  FaTwitter,
  FaShippingFast,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import HorizontalProductCard from "@/components/Main/BookDetails/HorizontalProductCard/HorizontalProductCard";
import ProductCard from "@/components/Shared/ProductCard";
import Link from "next/link";
import { StateContext } from "@/contexts/StateProvider/StateProvider";

const BookDetailsPage = ({ bookDetails }) => {
  return (
    <div className="bg-white">
      <div className="container mx-auto text-black">
        <p className="py-5">
          Home/ Categories/ {bookDetails?.categoryInfo?.category}
        </p>
        {/* <Login /> */}
        <div className="grid grid-cols-4">
          <div className="col-span-3 grid grid-cols-2 gap-5 h-fit">
            <div className="flex col-span-2 w-full gap-10">
              <div className="flex flex-col gap-5">
                {bookDetails.images && bookDetails.images.length > 0 && (
                  <img
                    className="object-cover w-full md:w-fit lg:w-[360px] h-[400px]"
                    src={bookDetails.images[0]}
                  />
                )}
                {bookDetails.images && bookDetails.images.length > 1 && (
                  <div className="flex items-center gap-5">
                    {bookDetails.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className="w-20 h-40 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">{bookDetails?.name}</h2>
                <div className="text-4xl text-red-500 font-bold">
                  Tk {bookDetails?.pricing?.price}
                </div>
                <p>Writer: {bookDetails?.specification?.author}</p>
                <p>Publisher: {bookDetails?.specification?.brand}</p>
                <p>Category: {bookDetails?.categoryInfo?.category}</p>
                <div className="flex gap-2">
                  <p>
                    Availability:{" "}
                    <span className="text-green-500">In Stock</span>
                  </p>
                  <p>
                    <span className="font-semibold">SKU:</span>
                    {bookDetails?.inventory?.sku}
                  </p>
                </div>
                <div className="primary-btn w-fit">
                  Offer Ends in: 2 days 09:20:30
                </div>
                <p>Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleMinusClick}
                    className="p-2 px-3 border"
                  >
                    <FaMinus />
                  </button>
                  <span>{cartCount}</span>
                  <button
                    onClick={handlePlusClick}
                    className="p-2 px-3 primary-btn"
                  >
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
                  <Link
                    href="/checkout"
                    className="primary-btn w-40 flex justify-center"
                  >
                    Buy Now
                  </Link>
                </div>
                <p className="flex items-center gap-5">
                  Share:
                  <FaFacebookF className="bg-blue-500 p-1 text-3xl rounded-full text-white" />
                  <FaTwitter className="bg-sky-500 p-1 text-3xl rounded-full text-white" />
                  <FaInstagram className="bg-pink-500 p-1 text-3xl rounded-full text-white" />
                </p>
              </div>
            </div>
            <div className="flex col-span-2 items-start h-fit">
              <div className="flex flex-col py-10">
                <div className="flex gap-10 py-5">
                  <span className="border-b-2 border-black">Description</span>
                  <span className="">Additional information</span>
                  <span className="">Review</span>
                </div>

                <div className="flex flex-col gap-5 mr-2">
                  <p>{bookDetails.description}</p>

                  <p className="text-xl">Specification</p>
                  <div>
                    <div className="grid grid-cols-4">
                      <span>Category</span>
                      <span className="col-span-2">
                        {bookDetails?.categoryInfo?.category} ||{" "}
                        {bookDetails?.categoryInfo?.subCategory} ||{" "}
                        {bookDetails?.categoryInfo?.subSubCategory} ||{" "}
                        {bookDetails?.categoryInfo?.subSubSubCategory}
                      </span>
                    </div>
                    <div className="grid grid-cols-4">
                      <span>Author</span>
                      <span className="col-span-2">
                        {bookDetails?.specification?.author}
                      </span>
                    </div>
                    <div className="grid grid-cols-4">
                      <span>Brand</span>
                      <span className="col-span-2">
                        {bookDetails?.specification?.brand}
                      </span>
                    </div>
                    <div className="grid grid-cols-4">
                      <span>Manufacturer</span>
                      <span className="col-span-2">
                        {bookDetails?.specification?.supplier}
                      </span>
                    </div>
                    <div className="grid grid-cols-4">
                      <span>Weight</span>
                      <span className="col-span-2">
                        {bookDetails?.shipping?.weight}
                      </span>
                    </div>
                  </div>
                  <p>{bookDetails?.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <div className="flex flex-col gap-3 text-sm border p-5">
              <div className="flex flex-nowrap items-center gap-5 py-3 border-b">
                <MdOutlineSecurityUpdateGood className="text-3xl" />
                <div className="flex flex-col">
                  <p className="font-semibold">SECURED PAYMENT</p>
                  <p>We ensure secure payment</p>
                </div>
              </div>
              <div className="flex flex-nowrap items-center gap-5 py-3 border-b">
                <FaShippingFast className="text-3xl" />
                <div className="flex flex-col">
                  <p className="font-semibold">FREE SHIPPING</p>
                  <p>ON ALL Tk above 700 TK</p>
                </div>
              </div>
              <div className="flex flex-nowrap items-center gap-5 py-3 ">
                <SiMoneygram className="text-3xl" />
                <div className="flex flex-col">
                  <p className="font-semibold">MONEY BACK GUARANTEE</p>
                  <p>Any back within 7 days </p>
                </div>
              </div>
            </div>
            <div className="border rounded p-3">
              <p className="font-semibold text-xl">Review</p>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-lg">121 Customers</p>
                  <p className="text-6xl">4.6</p>
                  <span className="flex items-center text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </span>
                  <p>out of 5</p>
                </div>
                <div className="flex flex-col items-start gap-5">
                  <p>Rating</p>
                  <div>
                    <div className="flex items-start gap-5">
                      <p>5</p>
                      <span className="h-5 w-32 p-2 bg-green-500"></span>
                    </div>
                    <div className="flex items-start gap-5">
                      <p>4</p>
                      <span className="h-5 w-28 p-2 bg-blue-500"></span>
                    </div>
                    <div className="flex items-start gap-5">
                      <p>3</p>
                      <span className="h-5 w-10 p-2 bg-orange-500"></span>
                    </div>
                    <div className="flex items-start gap-5">
                      <p>2</p>
                      <span className="h-5 w-5 p-2 bg-yellow-500"></span>
                    </div>
                    <div className="flex items-start gap-5">
                      <p>1</p>
                      <span className="h-5 w-2 p-2 bg-red-500"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Products  starts*/}
            <div className="flex flex-col gap-5">
              <p className="input-box rounded-none text-xl font-semibold">
                Recommended for you
              </p>
              <div className="flex flex-col gap-5">
                {relatedBooks.slice(0, 3).map((book, index) => (
                  <HorizontalProductCard key={book._id} book={book} />
                ))}
              </div>
            </div>
            {/* Recommended Products  ends*/}
          </div>
          <p className="text-xl font-semibold">Related Products</p>
          <div className="col-span-4 grid grid-cols-6 gap-5 py-5">
            {/* {allBooks.map((book, index) => (
              <ProductCard key={book._id} book={book} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
