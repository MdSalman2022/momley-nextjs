"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
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

const navigationLinks = [
  {
    href: "/profile/edit-profile",
    label: "Edit Profile",
    icon: myprofile,
    activeIcon: myprofile_white,
  },
  {
    href: "/profile/orders",
    label: "Orders",
    icon: myorders,
    activeIcon: myorders_white,
  },
  {
    href: "/profile/reviews",
    label: "Reviews",
    icon: myreviews,
    activeIcon: myreviews_white,
  },
  {
    href: "/profile/notification",
    label: "Notifications",
    icon: notification,
    activeIcon: notification_white,
  },
  {
    href: "/profile/settings",
    label: "Settings",
    icon: settings,
    activeIcon: settings_white,
  },
];

const Layout = ({ children }) => {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="container mx-auto flex gap-6">
      <nav className="w-[15%] min-h-fit mt-4">
        <div className="flex flex-col gap-1 h-fit border p-3">
          {navigationLinks.map(({ href, label, icon, activeIcon }) => (
            <Link
              key={href}
              href={href}
              className={`h-[52px] px-6 flex items-center gap-2 rounded ${
                pathname.includes(href)
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <Image
                src={pathname.includes(href) ? activeIcon : icon}
                alt={label}
              />
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="h-[52px] px-6 flex items-center gap-2 rounded bg-white text-red-600 hover:bg-gray-100"
          >
            <Image src={logout} alt="Logout" />
            Logout
          </button>
        </div>
      </nav>
      <main className="w-[85%] p-4 min-h-screen mt-4">{children}</main>
    </div>
  );
};

export default Layout;
