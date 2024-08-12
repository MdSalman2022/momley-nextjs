"use client";
import { useAuth } from "@/contexts/AuthProvider/AuthProvider";
import Image from "next/image";
import React from "react";
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

const DashboardHeader = () => {
  const { user } = useAuth();
  return (
    <div className="flex justify-between p-6 border py-3 px-9 w-full rounded mb-6">
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
            <p className="leading-6 font-semibold">{user?.displayName}</p>
            <p>Admin</p>
          </div>
          {user && (
            <DropdownMenu className="" align="end">
              <DropdownMenuTrigger>
                <img
                  className="w-10 rounded-full"
                  src={
                    user.photoURL ||
                    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  alt=""
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href="/dashboard/overview"
                    className="cursor-pointer w-full"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/profile/edit-profile"
                    className="cursor-pointer w-full"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/checkout" className="cursor-pointer w-full">
                    Cart
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logOut()}
                  className="cursor-pointer w-full"
                >
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
