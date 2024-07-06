import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div className="h-[800px] flex flex-col items-center justify-center">
      <div className="border rounded-lg p-10 flex flex-col gap-4 items-center justify-center">
        <TiTick className="p-5 rounded-full border-8 border-green-500 text-green-500 text-9xl " />
        <div className="text-center">
          <p>Order Successful</p>
          <p>Your order has been successfully placed</p>
        </div>
        <Link to="/">
          <button className="primary-btn">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
