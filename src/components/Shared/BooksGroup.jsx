"use client";

import ProductCard from "./ProductCard";

const BooksGroup = async ({ books }) => {
  return (
    <div className="py-5 flex flex-col gap-3 items-center">
      <div className="grid grid-cols-8 gap-5">
        {books.map((book, index) => (
          <ProductCard key={index} book={book} />
        ))}
      </div>
      <button className="primary-btn">See All</button>
    </div>
  );
};

export default BooksGroup;
