"use client";
import { useAuth } from "@/contexts/AuthProvider/AuthProvider";
import Image from "next/image";
import React, { useContext } from "react";
import { GrSearch } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineNotifications } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DropdownMenus from "../DropDownMenus/DropdownMenus";
import { StateContext } from "@/contexts/StateProvider/StateProvider";

const DashboardHeader = () => {
  const { user, logOut } = useAuth();
  const { userInfo } = useContext(StateContext);
  return (
    <div className="flex justify-between p-6 border py-3 px-9 w-full rounded mb-1">
      <div className="flex items-center gap-3 relative">
        <input
          type="text"
          className="input-box w-[310px] h-[35px] pl-3 rounded-full bg-[#F2F2F2]"
          placeholder="Search"
        />
        <button className="absolute right-3 mt-2 rounded flex items-center justify-center h-[18px] w-[18px] text-[#828282]">
          <GrSearch className="text-xl" />
        </button>
      </div>

      <div className="flex items-center gap-5">
        <span className="text-2xl">
          <MdOutlineNotifications />
        </span>
        <span className="text-2xl">
          <HiOutlineShoppingBag />
        </span>

        <div className="flex items-center gap-5">
          <div className="flex flex-col">
            <p className="leading-6 font-semibold">{userInfo?.userName}</p>
            <p>Admin</p>
          </div>
          {user && <DropdownMenus user={user} userInfo={userInfo} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
