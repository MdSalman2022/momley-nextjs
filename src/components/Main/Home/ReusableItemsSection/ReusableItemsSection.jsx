import React, { lazy, Suspense } from "react";
import Link from "next/link";
import { GrSearch } from "react-icons/gr";
const ProductCard = lazy(() => import("@/components/Shared/ProductCard"));
import NewLatestCollectionMen from "../../../../../public/images/ads/NewLatestCollectionMen.png";
import TrendingWomenCollection from "../../../../../public/images/ads/TrendingWomenCollection.png";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import AdsSlider from "./AdsSlider";

const ReusableItemsSection = ({ title, items, ads, bottomAds }) => {
  console.log("items", items);
  return (
    <div className="flex flex-col items-start px-4 md:px-0">
      <div className="flex items-center justify-between w-full">
        <p className="font-bold">{title}</p>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 relative ">
            <input
              type="text"
              className="input-box w-[240px] h-10 pl-3 rounded-lg border-2 border-[#333333]"
              placeholder="Search"
            />
            <button className="absolute right-1 top-2 rounded bg-black text-white flex items-center justify-center w-[60px] h-8">
              <GrSearch className="text-xl" />
            </button>
          </div>
          <span className="text-sm md:text-base md:bg-black rounded-lg text-black md:text-white font-bold h-8 w-[105px] flex items-center justify-end md:justify-center cursor-pointer">
            View All
          </span>
        </div>
      </div>
      <div className="md:py-5 flex flex-col gap-3 items-center w-full">
        <div className={`hidden md:grid grid-cols-${ads?.length} gap-6 w-full`}>
          {ads?.map((ad, index) => (
            <div className="relative w-full h-[116px]">
              <Image
                src={ad?.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 p-4">
                <p className={`text-[15px]`} style={{ color: ad.TextColor }}>
                  {ad.firstLine}
                </p>
                <p
                  className={`font-bold text-2xl`}
                  style={{ color: ad.TextColor }}
                >
                  {ad.secondLine}
                </p>
                <p className={`text-xs`} style={{ color: ad.TextColor }}>
                  {ad.thirdLine}
                </p>
                <span
                  className={`text-sm font-semibold flex items-center gap-2`}
                  style={{ color: ad.TextColor }}
                >
                  <p>Shop Now</p>
                  <FaArrowRightLong />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden w-full bg-red-100">
          <AdsSlider ads={ads} />
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-[164px] h-[217px]  rounded-lg bg-gray-300 animate-pulse p-5 flex flex-col items-center gap-5"
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
          <div className="grid grid-cols-2 md:flex flex-row justify-start items-start w-full gap-5 mt-2 md:mt-0">
            {items &&
              items
                ?.slice(0, 7)
                ?.map((book, index) => <ProductCard key={index} book={book} />)}
          </div>
        </Suspense>

        {/* <Link href="/books">
          <button className="primary-btn">See All</button>
        </Link> */}
        <div
          className={`hidden md:grid grid-cols-${bottomAds?.length} gap-6 w-full`}
        >
          {bottomAds?.map((ad, index) => {
            return (
              <div className="relative w-full h-[226px]">
                <Image
                  src={ad?.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 p-4 h-full flex flex-col justify-center items-start">
                  <p className={`text-[15px]`} style={{ color: ad.TextColor }}>
                    {ad.firstLine}
                  </p>
                  <p
                    className={`font-bold text-2xl`}
                    style={{ color: ad.TextColor }}
                  >
                    {ad.secondLine}
                  </p>
                  <p className={`text-xs`} style={{ color: ad.TextColor }}>
                    {ad.thirdLine}
                  </p>
                  <span
                    className={`text-sm font-semibold flex items-center gap-2 mt-5`}
                    style={{ color: ad.TextColor }}
                  >
                    <p>Shop Now</p>
                    <FaArrowRightLong />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:hidden w-full bg-red-100">
          <AdsSlider ads={bottomAds} />
        </div>
      </div>
    </div>
  );
};

export default ReusableItemsSection;
