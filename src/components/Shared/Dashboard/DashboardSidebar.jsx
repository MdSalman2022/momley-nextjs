"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import logout from "../../../../public/images/profile/logout.svg";
import Image from "next/image";
import Link from "next/link";

import { BsBarChart, BsShop } from "react-icons/bs";
import { FiBox, FiLayout } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineInventory, MdOutlineRoomPreferences } from "react-icons/md";
import { PiPathBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbShoppingBag } from "react-icons/tb";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const navigationLinks = [
  {
    id: 1,
    href: "/dashboard/overview",
    label: "Dashboard",
    icon: <RxDashboard />,
  },
  {
    id: 2,
    href: "/dashboard/orders",
    label: "Order",
    icon: <TbShoppingBag />,
    subLinks: [
      {
        id: 1,
        href: "/dashboard/orders",
        label: "Orders",
      },
      {
        id: 2,
        href: "/dashboard/orders/abandoned",
        label: "Abandoned Checkout",
      },
    ],
  },
  // {
  //   id: 3,
  //   href: "/dashboard/categories",
  //   label: "Categories",
  //   icon: <FiBox />,
  // },
  {
    id: 3,
    href: "/dashboard/products",
    label: "Products",
    icon: <FiBox />,
  },
  {
    id: 4,
    href: "/dashboard/inventory",
    label: "Inventory",
    icon: <MdOutlineInventory />,
  },
  {
    id: 5,
    href: "/dashboard/shopper-list",
    label: "Shopper List",
    icon: <BsShop />,
  },
  {
    id: 6,
    href: "/dashboard/customers",
    label: "Customers",
    icon: <GoPeople />,
  },
  {
    id: 7,
    href: "/dashboard/discount",
    label: "Discount",
    icon: <MdOutlineLocalOffer />,
  },
  {
    id: 8,
    href: "/dashboard/report",
    label: "Report",
    icon: <BsBarChart />,
  },
  {
    id: 9,
    href: "/dashboard/preferences",
    label: "Preferences",
    icon: <MdOutlineRoomPreferences />,
  },
  {
    id: 10,
    href: "/dashboard/navigation",
    label: "Navigation",
    icon: <PiPathBold />,
  },
  {
    id: 11,
    href: "/dashboard/page-create",
    label: "Page Create",
    icon: <FiLayout />,
  },
  {
    id: 12,
    href: "/dashboard/reviews",
    label: "Reviews",
    icon: <GoPeople />,
  },
  {
    id: 13,
    href: "/dashboard/settings/users&permissions",
    label: "Settings",
    icon: <IoSettingsOutline />,
    subLinks: [
      {
        id: 1,
        href: "/dashboard/settings/users&permissions",
        label: "Users & Permissions",
      },
      {
        id: 2,
        href: "/dashboard/settings/logo-update",
        label: "Logo Update",
      },
      {
        id: 2,
        href: "/dashboard/settings/review-permissions",
        label: "Review Permission ",
      },
      {
        id: 2,
        href: "/dashboard/settings/setting",
        label: "Setting",
      },
    ],
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const [activeSubLink, setActiveSubLink] = useState(null);

  return (
    <div className="flex flex-col gap-1 h-fit p-3">
      {navigationLinks.map(({ id, href, label, icon, subLinks }) => (
        <div key={id}>
          <Link
            key={id}
            href={href}
            prefetch={true}
            onClick={() => setActiveSubLink(id)}
            className={`h-[52px] px-6 flex items-center gap-2 rounded ${
              pathname?.includes(href)
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 items-center">
                {icon}
                {label}
              </div>
              {subLinks?.length > 0 && (
                <span
                  className={`${
                    activeSubLink === id ? "transform rotate-180" : ""
                  }`}
                >
                  <FaChevronDown />
                </span>
              )}
            </div>
          </Link>
          {subLinks &&
            activeSubLink === id &&
            subLinks.map(({ id, href, label }) => (
              <Link
                key={id}
                href={href}
                prefetch={true}
                className={`h-[42px] pl-12 flex items-center gap-2 rounded ${
                  pathname === href ? "" : ""
                }`}
              >
                <span
                  className={`w-2 h-2 ${
                    pathname === href ? "opacity-1" : "opacity-0"
                  } bg-black rounded-full`}
                ></span>
                {label}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
