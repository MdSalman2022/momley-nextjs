import React, { useState } from "react";
import { BiLogOut, BiUser } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import MyProfile from "../../../../components/UserProfile/MyProfile/MyProfile";
import MyOrder from "../../../../components/UserProfile/MyOrder/MyOrder";
import MyReview from "../../../../components/UserProfile/MyReview/MyReview";
import MyNotification from "../../../../components/UserProfile/MyNotification/MyNotification";
import MySetting from "../../../../components/UserProfile/MySetting/MySetting";

const UserProfile = () => {
  const [pageName, setPageName] = useState("My Profile");

  return (
    <div className="px-5 md:px-0 py-10 bg-gray-50">
      <div className="flex flex-col items-start md:grid md:grid-cols-5 gap-10 container mx-auto">
        <div className="flex flex-col items-center gap-1 p-3 bg-white border h-fit w-full">
          <p
            onClick={() => setPageName("My Profile")}
            className={`h-[52px] rounded ${
              pageName === "My Profile"
                ? "bg-black text-white"
                : "bg-white text-black"
            } w-full flex items-center gap-2 px-5`}
          >
            <BiUser className="text-xl" /> My Profile
          </p>
          <p
            onClick={() => setPageName("My Order")}
            className={`h-[52px] rounded ${
              pageName === "My Order"
                ? "bg-black text-white"
                : "bg-white text-black"
            } w-full flex items-center gap-2 px-5`}
          >
            <AiOutlineShoppingCart /> My Order
          </p>
          <p
            onClick={() => setPageName("My Review")}
            className={`h-[52px] rounded ${
              pageName === "My Review"
                ? "bg-black text-white"
                : "bg-white text-black"
            } w-full flex items-center gap-2 px-5`}
          >
            <BsListStars /> My Review
          </p>
          <p
            onClick={() => setPageName("My Notification")}
            className={`h-[52px] rounded ${
              pageName === "My Notification"
                ? "bg-black text-white"
                : "bg-white text-black"
            } w-full flex items-center gap-2 px-5`}
          >
            <IoNotificationsOutline /> Notification
          </p>
          <p
            onClick={() => setPageName("My Setting")}
            className={`h-[52px] rounded ${
              pageName === "My Setting"
                ? "bg-black text-white"
                : "bg-white text-black"
            } w-full flex items-center gap-2 px-5`}
          >
            <AiOutlineSetting /> Setting
          </p>
          <p className="h-[52px] rounded bg-white text-red-500 w-full flex items-center gap-2 px-5">
            <BiLogOut /> Logout
          </p>
        </div>
        <div className="col-span-4">
          {pageName === "My Profile" && <MyProfile />}
          {pageName === "My Order" && <MyOrder />}
          {pageName === "My Review" && <MyReview />}
          {pageName === "My Notification" && <MyNotification />}
          {pageName === "My Setting" && <MySetting />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
