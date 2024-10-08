"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import logout from "../../../../public/images/profile/logout.svg";
import Image from "next/image";
import Link from "next/link";

import { BsBarChart, BsShop } from "react-icons/bs";
import { FiBox, FiLayout } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineInventory,
  MdOutlineLocalShipping,
  MdOutlineRateReview,
  MdOutlineRoomPreferences,
  MdPayments,
} from "react-icons/md";
import { PiPathBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbShoppingBag } from "react-icons/tb";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { storeId } from "@/libs/utils/common";
import usePage from "@/hooks/usePage";
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import { RiDashboardLine } from "react-icons/ri";

const iconMapping = {
  BsBarChart,
  BsShop,
  FiBox,
  FiLayout,
  GoPeople,
  IoSettingsOutline,
  MdOutlineInventory,
  MdOutlineRoomPreferences,
  PiPathBold,
  RxDashboard,
  TbShoppingBag,
  MdOutlineLocalOffer,
  FaChevronDown,
  RiDashboardLine,
  MdPayments,
  MdOutlineLocalShipping,
  MdOutlineRateReview,
};

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { getPages } = usePage();

  const [activeSubLink, setActiveSubLink] = useState(null);

  const {
    data: pages = {},
    isLoading: isPagesLoading,
    refetch: refetchPages,
  } = useQuery({
    queryKey: ["pages", storeId],
    queryFn: () => storeId && getPages(storeId),
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  console.log("pages", pages);

  const allPages =
    !isPagesLoading &&
    pages?.map((page) => {
      const IconComponent = iconMapping[page.icon];
      return {
        ...page,
        IconComponent,
      };
    });

  useEffect(() => {
    if (pathname?.split("/")?.length > 3 && allPages?.length > 0) {
      const findPage = allPages?.find((page) =>
        pathname.includes(page.url)
      )?._id;
      setActiveSubLink(findPage);
    }
  }, [allPages]);

  console.log("activeSubLink", activeSubLink);

  console.log("pagesWithIcons", allPages);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  console.log("condition check", allPages?.subPages?.length > 0, activeSubLink);

  if (isPagesLoading) {
    return (
      <div className="flex flex-col gap-1 p-3">
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="flex h-[52px] w-full bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 h-fit p-3">
      {allPages?.map(({ IconComponent, _id, url, name, icon, subPages }) => (
        <div key={_id}>
          <Link
            href={url}
            prefetch={true}
            onClick={() => setActiveSubLink(_id)}
            className={`h-[42px] px-6 flex items-center gap-2 rounded ${
              pathname?.includes(url)
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 items-center">
                {IconComponent && <IconComponent />}
                {name}
              </div>
              {subPages?.length > 0 && (
                <span
                  className={`${
                    activeSubLink === _id ? "transform rotate-180" : ""
                  }`}
                >
                  <FaChevronDown />
                </span>
              )}
            </div>
          </Link>
          {subPages?.length > 0 &&
            activeSubLink === _id &&
            subPages.map(({ _id, url, name }) => (
              <Link
                key={_id}
                href={url}
                prefetch={true}
                className={`h-[42px] pl-12 flex items-center gap-2 rounded`}
              >
                <span
                  className={`w-2 h-2 ${
                    pathname?.includes(url) ? "opacity-1" : "opacity-0"
                  } bg-black rounded-full`}
                ></span>
                {name}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
