import Banner from "@/components/Main/Home/Banner/page";
import BooksInHome from "@/components/Main/Home/BooksInHome/page";
import Categories from "@/components/Main/Home/Categories/page";
import Image from "next/image";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  return (
    <div className="bg-white w-full">
      <Toaster />
      <div className="container mx-auto flex flex-col gap-5">
        <Banner />
        <Categories />
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
          <BooksInHome />
        </Suspense>
      </div>
    </div>
  );
}
