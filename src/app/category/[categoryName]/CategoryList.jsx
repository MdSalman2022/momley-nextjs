"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const CategoryList = ({ categories }) => {
  const { pageSize, page, setTotalPages, filterBooks, setFilterBooks } =
    useContext(StateContext);

  const handleFilterCategory = (category) => {
    setWriterName(category);
    fetch(
      `http://localhost:5000/api/get/books/bycategory?category=${category}&&page=${page}&&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(category);
        console.log(data);
        setFilterBooks(data.books);
        const pages = Math.ceil(data.totalDataLength / pageSize);
        setTotalPages(pages);
      });
  };

  return (
    <div>
      {categories.map((category, index) => (
        <label
          key={index}
          onClick={() => handleFilterCategory(category)}
          className="label justify-start gap-5 cursor-pointer border-b"
        >
          <input type="radio" name="priceRange" className="radio radio-sm" />
          <div className="flex gap-5 py-3 ">
            <span className="transition-all duration-200 cursor-pointer font-medium hover:font-semibold">
              {category}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default CategoryList;
