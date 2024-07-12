"use client";
import Link from "next/link";
import React from "react";
import DashboardHeader from "@/components/Shared/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Shared/Dashboard/DashboardSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full flex gap-6">
        <nav className="w-[15%] min-h-fit flex flex-col border">
          <Link href="/" className="logo py-5 px-8 border-b">
            <img
              src="https://i.ibb.co/TW8T2kc/logo-momley.png"
              alt="momley"
              width={250}
              height={120}
            />
          </Link>
          <DashboardSidebar />
        </nav>
        <main className="w-[83%] min-h-screen flex flex-col">
          <div className="py-2">
            <DashboardHeader />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
