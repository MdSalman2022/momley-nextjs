"use client";
import HorizontalBookCard from "@/components/Main/BookDetails/HorizontalBookCard/HorizontalBookCard";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

export default function RecommendedBooks({ bookId }) {
  const { allBooks } = useContext(StateContext);
  const relatedBooks = allBooks.filter((book) => book._id !== bookId);
  return (
    <div className="flex flex-col gap-5">
      <p className="input-box rounded-none text-xl font-semibold">
        Recommended for you
      </p>
      <div className="flex flex-col gap-5">
        {relatedBooks.slice(0, 3).map((book, index) => (
          <HorizontalBookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
