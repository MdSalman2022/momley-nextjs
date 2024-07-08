import React from "react";

const ConfirmOrder = () => {
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="relative">
        <div className="border rounded py-10 px-9 flex flex-col items-start gap-5">
          <div className="flex items-start gap-10">
            <div className="grid grid-cols-3 gap-5">
              <p className="font-medium col-span-3  text-lg">
                Delivery Information
              </p>
              <p className="font-medium">Customer Info</p>
              <div className="flex flex-col col-span-2">
                <span>: Md Omar Faruk</span>
                <span className="pl-2"> +8801830592084</span>
                <span className="pl-2"> faruk@gmail.com</span>
              </div>
              <p className="font-medium">Delivery To</p>
              <div className="flex items-start gap-1 col-span-2 max-w-72">
                <span>:</span>
                <div className="flex flex-col">
                  <span>
                    House No 102, Road No 32, Block K, Dhaka, Bangladesh, 3100
                  </span>
                </div>
              </div>
              <p className="font-medium">Payment Status</p>{" "}
              <div className="flex flex-col  col-span-2">
                <span>: Cash On Delivery</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <p className="font-medium text-lg col-span-2">Order Summery</p>
              <p className="font-medium">Subtotal (2 Items)</p>
              <div className="flex flex-col col-span-1">1,120.00</div>
              <p className="font-medium">Home Delivery</p>
              <div className="flex flex-col  col-span-1">
                <span>50.00</span>
              </div>
              <p className="font-medium">Total</p>{" "}
              <div className="flex flex-col  col-span-1">
                <span> 1,170.00</span>
              </div>
              <p className="font-medium">Amount Paid</p>{" "}
              <div className="flex flex-col  col-span-1">
                <span> 0.00</span>
              </div>
              <p className="font-medium">Grand Due</p>{" "}
              <div className="flex flex-col col-span-1">
                <span className="text-red-600 font-semibold">1,170.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 primary-btn mt-4 w-80 flex justify-center cursor-pointer">
          Confirm Order
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
