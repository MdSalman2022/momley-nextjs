import React from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";

const MyReview = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <p className="font-medium">My Order</p>
        <button className="primary-btn">Save and Change</button>
      </div>

      <div className="border bg-white p-5 space-y-5">
        <p className="font-semibold py-2 border-b-2 border-black w-fit">
          Your product rating & review:
        </p>

        <div>
          <div className="flex">
            <div className="flex gap-5">
              <img
                className="h-20"
                src="https://i.ibb.co/VJJW1pv/image.png"
                alt=""
              />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <p>ABC</p>
                      <small>Writer: Dummy writer</small>
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
                    <div className="flex flex-col justify-start gap-5">
                      <small>Purchased on 19 April 2020</small>
                      <div className="flex items-center justify-end gap-5 text-xl">
                        <AiTwotoneLike />
                        <AiTwotoneDislike />
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="input-box h-fit w-full p-3"
                    name=""
                    id=""
                    cols="90"
                    rows="5"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
