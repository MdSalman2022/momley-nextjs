"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const PriceRange = () => {
  const {
    pageSize,
    page,
    setTotalPages,
    filterBooks,
    setFilterBooks,
    writerName,
    setWriterName,
  } = useContext(StateContext);

  const underPrice = [250, 350, 450, 550, 1000];

  const handleFilterPrice = (price) => {
    fetch(
      `http://localhost:5000/api/get/books/byprice?amount=${price}&&page=${page}&&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setWriterName("");
        setFilterBooks(data.books);
        const pages = Math.ceil(data.totalDataLength / pageSize);
        setTotalPages(pages);
      });
  };

  return (
    <div>
      {" "}
      {underPrice.map((price, index) => (
        <div
          onClick={() => handleFilterPrice(price)}
          key={index}
          className="form-control border-b py-3 "
        >
          <label className="label justify-start gap-5 cursor-pointer">
            <input type="radio" name="priceRange" className="radio radio-sm" />
            <span className="label-text">Under {price}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default PriceRange;
