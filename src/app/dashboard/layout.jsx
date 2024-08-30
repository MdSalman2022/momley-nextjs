"use client";
import Link from "next/link";
import React, { useContext } from "react";
import DashboardHeader from "@/components/Shared/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Shared/Dashboard/DashboardSidebar";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import { StateContext } from "@/contexts/StateProvider/StateProvider";

const Layout = ({ children }) => {
  const { userInfo, storeInfo } = useContext(StateContext);

  const sellerCloudFrontURL = userInfo?.sellerCloudFrontURL;

  return (
    <div className="flex flex-col container mx-auto">
      <div className="w-full flex gap-6">
        <nav className="w-[30%] min-h-fit flex flex-col border">
          <Link href="/" className="logo py-5 px-8 border-b">
            <Image
              src={sellerCloudFrontURL?.replace(
                "*",
                `${storeInfo?.preferences?.logoOptions?.mainLogo}`
              )}
              alt="momley"
              width={234}
              height={51}
            />
          </Link>
          <DashboardSidebar />
        </nav>
        <main className="w-[83%] min-h-screen flex flex-col">
          <div className="py-2">
            <DashboardHeader />
          </div>
          <div className="py-1">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
