import React from "react";
import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";

const MyNotification = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg">Notification</p>

      <div className="p-4 border space-y-3">
        <p>Flash Sale is here</p>
        <div className="flex gap-5">
          <img
            className="h-20"
            src="https://i.ibb.co/VJJW1pv/image.png"
            alt=""
          />
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <div>
                    <p>ABC</p>
                    <small>Writer: Dummy writer</small>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                    </div>
                    <p>Good Product</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border space-y-3">
        <p>Flash Sale is here</p>
        <div className="flex gap-5">
          <img
            className="h-20"
            src="https://i.ibb.co/VJJW1pv/image.png"
            alt=""
          />
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <div>
                    <p>ABC</p>
                    <small>Writer: Dummy writer</small>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                    </div>
                    <p>Good Product</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotification;
