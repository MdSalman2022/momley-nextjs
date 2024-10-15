import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

const MobileHeader = () => {
  const { isPrimaryMobileHeaderVisible } = useContext(StateContext);
  const pathname = usePathname();

  if (pathname !== "/login")
    return (
      <div className={`flex items-center gap-3 md:hidden w-screen px-4 `}>
        <div className="flex items-center relative w-[90%]">
          <input
            type="text"
            className="rounded-full bg-[#f1f1f1] h-10 w-full pl-3"
            placeholder="Search for products"
          />
          <span className="absolute right-2 text-xl">
            <FiSearch />
          </span>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full aspect-square bg-[#f1f1f1] text-xl">
          <AiOutlineShoppingCart />
        </div>
      </div>
    );
};

export default MobileHeader;
