"use client";
import React from "react";

const page = () => {
  const handlePayment = async () => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/payment/bkash/payment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 10000,
          orderId: 1,
          userId: 1,
        }),
      }
    );
    console.log("response", response);
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => handlePayment()}
        className="primary-btn"
      >
        Pay
      </button>
    </div>
  );
};

export default page;
