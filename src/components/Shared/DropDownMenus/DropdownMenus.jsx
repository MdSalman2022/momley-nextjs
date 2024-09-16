import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import GeneratedProfileImage from "../GeneratedProfileImage";

const DropdownMenus = ({ userInfo, user }) => {
  const isAdmin =
    userInfo?.role === "seller" ||
    (userInfo?.role === "staff" && userInfo?.store === storeId);

  return (
    <div className="flex gap-4 flex-1 justify-end items-center'">
      <DropdownMenu className="" align="end">
        <DropdownMenuTrigger>
          {userInfo?.customer?.profilePicture ? (
            <img
              className="w-10 h-10 rounded-full border"
              src={userInfo?.cloudFrontURL?.replace(
                "*",
                `${userInfo?.customerId}/${userInfo?.customer?.profilePicture}`
              )}
              alt=""
            />
          ) : (
            <GeneratedProfileImage
              name={user?.displayName || "user"}
              size={40}
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/overview"
                className="cursor-pointer w-full"
              >
                Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          {userInfo?.role === "customer" && (
            <DropdownMenuItem asChild>
              <Link
                href="/profile/edit-profile"
                className="cursor-pointer w-full"
              >
                Profile
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
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
    </div>
  );
};

export default DropdownMenus;
