"use client";
import BookCard from "@/components/Shared/BookCard";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

export default function RelatedBooks({ bookId }) {
  const { allBooks } = useContext(StateContext);
  const relatedBooks = allBooks.filter((book) => book._id !== bookId);
  return (
    <div className="flex flex-col w-full">
      <p className="text-xl font-semibold">Related Products</p>
      <div className="col-span-4 grid grid-cols-6 gap-5 py-5">
        {allBooks.map((book, index) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
