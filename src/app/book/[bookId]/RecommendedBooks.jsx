"use client";
import HorizontalBookCard from "@/components/Main/BookDetails/HorizontalBookCard/HorizontalBookCard";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

export default function RecommendedBooks({ bookId }) {
  const { allBooks } = useContext(StateContext);
  const relatedBooks = allBooks.filter((book) => book._id !== bookId);
  console.log("relatedBooks", relatedBooks);
  return (
    <div className="flex flex-col gap-5">
      <p className="bg-[#333333] text-white h-12 flex items-center px-5 rounded-none text-xl font-medium">
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
