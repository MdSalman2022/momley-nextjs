import React from "react";
import { FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";

const MyNotification = () => {
  const notifications = [
    {
      title: "Flash Sale is here",
      image: "https://i.ibb.co/VJJW1pv/image.png",
      name: "ABC",
      writer: "Dummy writer",
      rating: 4.5,
      review: "Good Product",
    },
    {
      title: "Flash Sale is here",
      image: "https://i.ibb.co/VJJW1pv/image.png",
      name: "ABC",
      writer: "Dummy writer",
      rating: 4.5,
      review: "Good Product",
    },
  ];

  return (
    <div className="space-y-5 ">
      <p className="text-lg">Notification</p>

      <div className="flex flex-col gap-5">
        {notifications.map((notification) => (
          <div className="px-6 py-[18px] border space-y-3">
            <p>{notification?.title}</p>
            <div className="flex gap-5">
              <img className="h-20" src={notification?.image} alt="" />
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <div>
                        <p>{notification?.name}</p>
                        <small>Writer: {notification?.writer}</small>
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
        ))}
      </div>
    </div>
  );
};

export default MyNotification;
