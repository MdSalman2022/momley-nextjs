"use client";
import ProductCard from "@/components/Shared/ProductCard";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const ProductList = ({ books, allBooks }) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {books?.length > 0 &&
        books?.map((book, index) => (
          <ProductCard key={index} book={book} />
        ))}{" "}
      {/* {filterBooks.length > 0
        ? filterBooks?.map((book, index) => (
            <ProductCard key={index} book={book} />
          ))
        : books?.length > 0
        ? books?.map((book, index) => <ProductCard key={index} book={book} />)
        : allBooks?.map((book, index) => (
            <ProductCard key={index} book={book} />
          ))} */}
    </div>
  );
};

export default ProductList;
