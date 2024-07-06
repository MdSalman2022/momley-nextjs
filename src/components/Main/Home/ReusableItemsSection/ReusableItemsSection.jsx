import React, { lazy, Suspense } from "react";
import Link from "next/link";
import { GrSearch } from "react-icons/gr";
const BookCard = lazy(() => import("@/components/Shared/BookCard"));

const ReusableItemsSection = ({ title, items }) => {
  console.log("items", items);
  return (
    <div className="py-5 flex flex-col items-start">
      <div className="flex justify-between w-full">
        <p className="font-bold">{title}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 relative ">
            <input
              type="text"
              className="input-box w-[240px] h-10 pl-3 rounded-lg border-2 border-[#333333]"
              placeholder="Search"
            />
            <button className="absolute right-1 top-2 rounded bg-black text-white flex items-center justify-center w-[60px] h-8">
              <GrSearch className="text-xl" />
            </button>
          </div>
          <span className="bg-black rounded-lg text-white font-bold h-8 w-[105px] flex items-center justify-center cursor-pointer">
            View All
          </span>
        </div>
      </div>
      <div className="py-5 flex flex-col gap-3 items-center w-full">
        <Suspense
          fallback={
            <div className="flex flex-col md:grid grid-cols-5 gap-5">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-64 h-96 rounded-lg bg-gray-300 animate-pulse p-5 flex flex-col items-center gap-5"
                  >
                    <div className="rounded-lg w-full h-64 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-20 h-5 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-20 h-5 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-20 h-5 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-40 h-14 bg-gray-400 animate-pulse"></div>
                  </div>
                ))}
            </div>
          }
        >
          <div className="flex flex-col md:grid grid-cols-5 gap-5">
            {items &&
              items
                ?.slice(0, 20)
                ?.map((book, index) => <BookCard key={index} book={book} />)}
          </div>
        </Suspense>

        <Link href="/books">
          <button className="primary-btn">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default ReusableItemsSection;
