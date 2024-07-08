import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const OrderSuccessful = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <span className="text-9xl text-[#00954D]">
        <IoCheckmarkCircleOutline />
      </span>
      <div className="flex flex-col items-center mt-2 mb-5">
        <h1 className="text-lg font-semibold text-[#4D4B4B]">
          Order Successful
        </h1>
        <p className="">Your order has been Successfully placed</p>
      </div>
      <div className="primary-btn cursor-pointer">Go to Home</div>
    </div>
  );
};

export default OrderSuccessful;
