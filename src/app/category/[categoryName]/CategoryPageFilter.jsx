"use client";
import React, { useState } from "react";
import AuthorsList from "./AuthorsList";
import CategoryList from "./CategoryList";
import PriceRange from "./PriceRange";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CategoryPageFilter = ({ authors, categories }) => {
  // State variables for section visibility
  const [showPrice, setShowPrice] = useState(true);
  const [showWriters, setShowWriters] = useState(true);
  const [showPublisher, setShowPublisher] = useState(true);

  // Toggle functions for each section
  const togglePrice = () => setShowPrice(!showPrice);
  const toggleWriters = () => setShowWriters(!showWriters);
  const togglePublisher = () => setShowPublisher(!showPublisher);

  return (
    <div>
      <div className="col-span-1 border rounded-lg flex flex-col gap-5 max-h-none px-[46px] py-[15px] ">
        {/* Price Section */}
        <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={togglePrice}
          >
            <span className="flex gap-5 items-center">Price </span>
            <div className="absolute h-[3px] bg-black w-10 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showPrice ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showPrice && <PriceRange />}
        </div>
        {/* Writers Section */}
        <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={toggleWriters}
          >
            <span className="flex gap-5 items-center">Writers </span>
            <div className="absolute h-[3px] bg-black w-14 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showWriters ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showWriters && <AuthorsList authors={authors} />}
        </div>
        {/* Publisher Section */}
        <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={togglePublisher}
          >
            <span className="flex gap-5 items-center">Publisher </span>
            <div className="absolute h-[3px] bg-black w-20 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showPublisher ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showPublisher && <CategoryList categories={categories} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageFilter;
