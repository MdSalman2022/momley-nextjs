"use client";
import React, { useContext, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import GeneratedProfileImage from "@/components/Shared/GeneratedProfileImage";
import { mobileWidth } from "@/libs/utils/common";
import { FaUser } from "react-icons/fa";
import myprofile from "../../../public/images/profile/myprofile.svg";
import myprofile_white from "../../../public/images/profile/myprofile_white.svg";
import myorders from "../../../public/images/profile/myorders.svg";
import myorders_white from "../../../public/images/profile/myorders_white.svg";
import myreviews from "../../../public/images/profile/myreviews.svg";
import myreviews_white from "../../../public/images/profile/myreviews_white.svg";
import settings from "../../../public/images/profile/settings.svg";
import settings_white from "../../../public/images/profile/settings_white.svg";
import notification from "../../../public/images/profile/notification.svg";
import notification_white from "../../../public/images/profile/notification_white.svg";
import logout from "../../../public/images/profile/logout.svg";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthProvider/AuthProvider";

const Profile = () => {
  const { logOut, loading, user } = useContext(AuthContext);
  const { isMobile, userInfo } = useContext(StateContext);
  const router = useRouter();
  useEffect(() => {
    console.log("isMobile test", isMobile);
    if (!isMobile) {
      redirect("/profile/edit-profile");
    }
  }, [isMobile]);

  console.log("userInfo", userInfo);

  useEffect(() => {
    if (!user?.uid && !loading) {
      if (isMobile) {
        router.push("/login");
      } else {
        setIsAuthModalOpen(true);
      }
    }
  }, [user]);

  const pages = [
    {
      id: 1,
      name: "Edit Profile",
      link: "/profile/edit-profile",
      icon: myprofile,
    },
    { id: 2, name: "Orders", link: "/profile/orders", icon: myorders },
    { id: 3, name: "Reviews", link: "/profile/reviews", icon: myreviews },
    {
      id: 4,
      name: "Notifications",
      link: "/profile/notification",
      icon: notification,
    },
    { id: 5, name: "Settings", link: "/profile/settings", icon: settings },
    { id: 6, name: "Logout", link: "/logout", icon: logout },
  ];

  return (
    <div className="container mx-auto px-0 md:hidden gap-6 w-full flex flex-col">
      <div className="flex flex-col items-center gap-1">
        <GeneratedProfileImage name={userInfo?.userName} size={100} />
        <h1 className="text-lg">{userInfo?.userName}</h1>
        <h6>{userInfo?.email}</h6>
      </div>
      <div className="flex flex-col">
        {pages.map((page) => (
          <div
            key={page.id}
            onClick={() => {
              if (page.link === "/logout") {
                console.log("Logging out...");
                logOut();
              } else {
                router.push(page.link);
              }
            }}
            className="flex items-center gap-4 p-4 rounded-lg border-b first:border-t"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f6f6f6] text-xl">
              <Image src={page.icon} />
            </div>
            <span>{page.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
