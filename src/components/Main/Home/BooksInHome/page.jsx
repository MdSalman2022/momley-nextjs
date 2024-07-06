import React, { lazy, Suspense } from "react";
import Link from "next/link";
import useBook from "@/app/hooks/useBook";
import { GrSearch } from "react-icons/gr";
import ReusableItemsSection from "../ReusableItemsSection/ReusableItemsSection";
const BookCard = lazy(() => import("@/components/Shared/BookCard"));

const BooksInHome = async () => {
  const { getAllBookDetails } = useBook();
  const allBooks = await getAllBookDetails(1, 20);
  console.log("allBooks", allBooks);
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <ReusableItemsSection
        title="New Arrival"
        items={allBooks.books.slice(0, 20)}
      />
      <ReusableItemsSection
        title="Mom & Baby"
        items={allBooks.books.slice(0, 20)}
      />
      <ReusableItemsSection
        title="All Products"
        items={allBooks.books.slice(0, 20)}
      />
    </div>
  );
};

export default BooksInHome;
