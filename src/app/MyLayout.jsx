import HeaderComponent from "@/components/Shared/HeaderComponent";
import React from "react";

const MyLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeaderComponent />
      <div className="container mx-auto px-0">{children}</div>
    </div>
  );
};

export default MyLayout;
