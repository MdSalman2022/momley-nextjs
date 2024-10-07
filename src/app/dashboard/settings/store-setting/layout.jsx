"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }) => {
  const tabs = [
    {
      name: "notifications",
      link: "/dashboard/settings/store-setting/notifications",
    },
    { name: "domains", link: "/dashboard/settings/store-setting/domains" },
    {
      name: "warehouses",
      link: "/dashboard/settings/store-setting/warehouses",
    },
    { name: "tax", link: "/dashboard/settings/store-setting/tax" },
    {
      name: "support & social",
      link: "/dashboard/settings/store-setting/support",
    },
    { name: "policies", link: "/dashboard/settings/store-setting/policies" },
  ];

  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <div>
      <div className="flex flex-col gap-5">
        <TopActionButtons title={"Store Setting"} />

        <div className="flex items-center">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              href={tab.link}
              className={`text-sm px-3 py-2 transition-colors duration-300 capitalize ${
                currentPath === tab.link ||
                (currentPath === "/dashboard/settings/store-setting" &&
                  tab.link ===
                    "/dashboard/settings/store-setting/notifications")
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab?.name}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
