"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

export default function AuthorsList({ authors }) {
  const { pageSize, page, setTotalPages, filterBooks, setFilterBooks } =
    useContext(StateContext);

  const handleFilterWriter = (writer) => {
    // setWriterName(writer);
    // fetch(
    //   `http://localhost:5000/api/get/books/byauthor?writer=${writer}&&page=${page}&&pageSize=${pageSize}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(writer);
    //     console.log(data);
    //     setFilterBooks(data.books);
    //     const pages = Math.ceil(data.totalDataLength / pageSize);
    //     setTotalPages(pages);
    //   });
  };

  return (
    <div>
      {authors.map((author, index) => (
        <label
          key={index}
          onClick={() => handleFilterWriter(author)}
          className="flex justify-start gap-5 cursor-pointer border-b last:border-0"
        >
          <input type="radio" name="priceRange" className="radio radio-sm" />
          <div className="flex gap-5 py-3 ">
            <span className="transition-all duration-200 cursor-pointer font-medium hover:font-semibold">
              {author}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
