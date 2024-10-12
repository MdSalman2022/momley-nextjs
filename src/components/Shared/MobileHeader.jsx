import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

const MobileHeader = () => {
  const pathname = usePathname();

  if (pathname !== "/login")
    return (
      <div className="flex items-center gap-3 md:hidden py-5 px-4 w-full">
        <div className="flex items-center relative w-full">
          <input
            type="text"
            className="rounded-full bg-[#f6f6f6] h-10 w-full"
          />
          <span className="absolute right-2 text-xl">
            <FiSearch />
          </span>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full aspect-square bg-[#f6f6f6] text-xl">
          <AiOutlineShoppingCart />
        </div>
      </div>
    );
};

export default MobileHeader;
