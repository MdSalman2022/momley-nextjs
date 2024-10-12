"use client";
import React from "react";
import Link from "next/link";

const CategorySlider = ({ categories }) => {
  return (
    <div className="md:hidden w-full">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <Link
            href={`/category/${category?.slug}`}
            key={index}
            className="flex justify-between items-center gap-10 h-10 w-fit px-3 bg-[#f6f6f6] rounded-full"
          >
            {category?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
