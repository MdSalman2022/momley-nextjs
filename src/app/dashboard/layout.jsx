"use client";
import Link from "next/link";
import React from "react";
import DashboardHeader from "@/components/Shared/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Shared/Dashboard/DashboardSidebar";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col container mx-auto">
      <div className="w-full flex gap-6">
        <nav className="w-[30%] min-h-fit flex flex-col border">
          <Link href="/" className="logo py-5 px-8 border-b">
            <Image src={logo} alt="momley" width={250} height={120} />
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
