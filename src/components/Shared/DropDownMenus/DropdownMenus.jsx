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
import { storeId } from "@/libs/utils/common";
import { useAuth } from "@/contexts/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

const DropdownMenus = ({ userInfo, user }) => {
  const router = useRouter();
  const { logOut } = useAuth();
  const isAdmin =
    userInfo?.role === "seller" ||
    (userInfo?.role === "staff" && userInfo?.storeId === storeId);

  const handleLogOut = () => {
    router.push("/");
    logOut();
  };

  return (
    <div className="flex gap-4 flex-1 justify-end items-center'">
      <DropdownMenu className="" align="end" modal={false}>
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
              name={userInfo?.userName || "user"}
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
            onClick={() => handleLogOut()}
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
