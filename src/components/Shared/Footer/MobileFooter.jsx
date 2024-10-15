"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { BsFillGrid1X2Fill, BsGrid1X2 } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";

const NavItem = ({
  href,
  active,
  setActive,
  activeIcon,
  inactiveIcon,
  label,
}) => {
  return (
    <Link
      href={href}
      onClick={() => setActive(href)}
      className="flex flex-col items-center"
    >
      {active === href ? activeIcon : inactiveIcon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

const MobileFooter = () => {
  const { isPrimaryMobileFooterVisible } = useContext(StateContext);
  const [active, setActive] = useState("");
  const pathname = usePathname();

  console.log("pathname", pathname);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  if (pathname !== "/login")
    return (
      <div
        className={`fixed bottom-0 left-0 z-[300] w-screen bg-white py-3 shadow-lg border-t border-gray-200 md:hidden ${
          isPrimaryMobileFooterVisible ? "flex" : "hidden"
        }`}
      >
        <div className="flex justify-around items-center text-black w-full">
          <NavItem
            href="/"
            active={active}
            setActive={setActive}
            activeIcon={<IoHome size={24} />}
            inactiveIcon={<IoHomeOutline size={24} />}
            label="Home"
          />
          <NavItem
            href="/categories"
            active={active}
            setActive={setActive}
            activeIcon={<BsFillGrid1X2Fill size={24} />}
            inactiveIcon={<BsGrid1X2 size={24} />}
            label="Categories"
          />
          <NavItem
            href="/checkout"
            active={active}
            setActive={setActive}
            activeIcon={<MdShoppingCart size={24} />}
            inactiveIcon={<MdOutlineShoppingCart size={24} />}
            label="Cart"
          />
          <NavItem
            href="/profile"
            active={active}
            setActive={setActive}
            activeIcon={<FaUserCircle size={24} />}
            inactiveIcon={<FaRegUserCircle size={24} />}
            label="Account"
          />
        </div>
      </div>
    );
};

export default MobileFooter;
