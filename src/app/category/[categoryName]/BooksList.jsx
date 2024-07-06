"use client";
import BookCard from "@/components/Shared/BookCard";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const BooksList = ({ books, allBooks }) => {
  const { filterBooks, setFilterBooks } = useContext(StateContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {" "}
      {filterBooks.length > 0
        ? filterBooks?.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        : books?.length > 0
        ? books?.map((book, index) => <BookCard key={index} book={book} />)
        : allBooks?.map((book, index) => <BookCard key={index} book={book} />)}
    </div>
  );
};

export default BooksList;
