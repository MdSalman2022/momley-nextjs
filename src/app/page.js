import Banner from "@/components/Main/Home/Banner/page";
import BooksInHome from "@/components/Main/Home/BooksInHome/page";
import Categories from "@/components/Main/Home/Categories/page";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Banner />
      <Categories />
      <Suspense
        fallback={
          <div className="flex flex-col gap-5 px-4">
            <span className="w-full bg-gray-300 animate-pulse h-32"></span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-48 h-full rounded-lg animate-pulse flex flex-col items-center gap-2 md:gap-5"
                  >
                    <div className="rounded-lg w-full h-56 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-20 h-4 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-20 h-4 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-20 h-4 bg-gray-400 animate-pulse"></div>
                    <div className="rounded-lg w-40 h-8 bg-gray-400 animate-pulse"></div>
                  </div>
                ))}
            </div>
          </div>
        }
      >
        <BooksInHome />
      </Suspense>
    </div>
  );
}
