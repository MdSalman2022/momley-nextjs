import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const ReviewCard = () => {
  return (
    <div className="bg-[#F2F2F2] rounded-lg p-3">
      <p className="font-semibold text-xl">Review</p>
      <div className="flex gap-5">
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg">121 Customers</p>
          <p className="text-6xl">4.6</p>
          <span className="flex items-center text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </span>
          <p className="text-[#999999]">out of 5</p>
        </div>
        <div className="flex flex-col items-start gap-5">
          <p>Rating</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center h-4">
              <p className="text-[10px] w-4 flex items-start">5</p>
              <span className="h-3 rounded w-32 bg-green-500"></span>
            </div>
            <div className="flex items-center h-4">
              <p className="text-[10px] w-4 flex items-start">4</p>
              <span className="h-3 rounded w-28 bg-blue-500"></span>
            </div>
            <div className="flex items-center h-4">
              <p className="text-[10px] w-4 flex items-start">3</p>
              <span className="h-3 rounded w-10 bg-orange-500"></span>
            </div>
            <div className="flex items-center h-4">
              <p className="text-[10px] w-4 flex items-start">2</p>
              <span className="h-3 rounded w-5 bg-yellow-500"></span>
            </div>
            <div className="flex items-center h-4">
              <p className="text-[10px] w-4 flex items-start">1</p>
              <span className="h-3 rounded w-8 bg-red-500"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
