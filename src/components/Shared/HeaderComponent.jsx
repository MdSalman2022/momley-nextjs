"use client";
import React, { useContext } from "react";
import Header from "./Header";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { usePathname } from "next/navigation";

const HeaderComponent = () => {
  const { isPrimaryMobileHeaderVisible } = useContext(StateContext);

  const pathname = usePathname();

  const isDashboardPage = pathname.includes("/dashboard");
  const isLoginPage = pathname.includes("/login");
  return (
    <div
      className={`flex flex-col w-full bg-red-600 h-full ${
        !isPrimaryMobileHeaderVisible || isDashboardPage || isLoginPage
          ? ""
          : "mb-16 md:mb-32"
      }`}
    >
      <Header />
    </div>
  );
};

export default HeaderComponent;
