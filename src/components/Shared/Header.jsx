"use client";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrSearch } from "react-icons/gr";
import { useContext, useEffect, useState } from "react";
import ModalBox from "./ModalBox";
import Login from "./Authentication/Login";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import MenuModal from "./MenuModal";
import Link from "next/link";
import CartIcon from "../../../public/images/CartIcon.svg";
import Image from "next/image";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import GeneratedProfileImage from "./GeneratedProfileImage";
import useCategory from "@/hooks/useCategory";
import { useQuery } from "react-query";
import { storeId } from "@/libs/utils/common";
import Menus from "./Menus";
import { IoReorderThree } from "react-icons/io5";

const NavigationItem = ({ name, item }) => (
  <Link
    href={`/category/${item?.slug}`}
    className="w-44 h-12 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
  >
    {name}
  </Link>
);

const Header = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, user, logOut } =
    useContext(AuthContext);
  const { cart, totalLevel } = useContext(StateContext);

  console.log("totalLevel", totalLevel);

  const { GetMenuByPosition } = useCategory();

  const {
    data: menus = {},
    isLoading: isMenuLoading,
    refetch: refetchMenus,
  } = useQuery({
    queryKey: ["menus", storeId, totalLevel],
    queryFn: () =>
      storeId &&
      totalLevel !== undefined &&
      GetMenuByPosition(storeId, "header", totalLevel),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("menus", menus);

  let allMenus = menus?.data?.categories || [];

  const processMenu = (menu, level, totalLevel) => {
    if (level > totalLevel) return null;

    return {
      name: menu?.name || "",
      slug: menu?.slug || "",
      subcategories:
        menu?.subcategories?.map((sub) =>
          processMenu(sub, level + 1, totalLevel)
        ) || [],
    };
  };

  allMenus = allMenus.map((menu) => processMenu(menu, 1, totalLevel));

  console.log("allMenus", allMenus);
  const navItems = [
    { name: "Mom & Baby" },
    { name: "Bath & Shower" },
    { name: "Fragrance" },
    { name: "Makeup" },
    { name: "New Arrivals" },
    { name: "Weekly Offers" },
  ];
  const pathname = usePathname();

  const isDashboardPage = pathname.includes("/dashboard");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`container mx-auto w-full justify-center ${
        isDashboardPage ? "hidden" : "mb-10 flex"
      } `}
    >
      <div className="flex flex-col  w-full z-10">
        <div
          name="general-header"
          className={` w-full py-2 transition-all duration-300 z-50 ${
            isScrolled ? "hidden" : "flex justify-start"
          }`}
        >
          {isAuthModalOpen && (
            <ModalBox
              isModalOpen={isAuthModalOpen}
              setIsModalOpen={setIsAuthModalOpen}
            >
              <Login setIsModalOpen={setIsAuthModalOpen} />
            </ModalBox>
          )}
          <nav className="flex items-center justify-between w-full ">
            <Link href="/" className="logo">
              <img
                src="https://i.ibb.co/TW8T2kc/logo-momley.png"
                alt="momley"
                width={250}
                height={120}
              />
            </Link>
            <div className="flex items-center gap-3 relative ">
              <input
                type="text"
                className="input-box w-[540px] h-[52px] pl-3 rounded-lg border-2 border-[#333333]"
                placeholder="Search for Products, Brands & Categories"
              />
              <button className="absolute right-1 top-2 rounded bg-black text-white flex items-center justify-center w-[87px] h-11">
                <GrSearch className="text-2xl" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-r px-5 gap-2">
                <FiPhoneCall className="text-2xl" />
                <div className="flex flex-col text-sm">
                  <span className="font-medium">Call Now</span>
                  <span>+8801812141241</span>
                </div>
              </div>
              <div className="flex flex-col px-5">
                Bag <span>৳ 0.00</span>
              </div>
              <Link href="/checkout" className="relative">
                <Image src={CartIcon} alt="" />
                <span className="absolute top-0 -right-1 w-4 h-4 text-xs rounded-full text-white bg-red-500 flex justify-center">
                  {cart.length}
                </span>
              </Link>
              {user ? (
                <div className="flex">
                  <DropdownMenu className="" align="end">
                    <DropdownMenuTrigger>
                      {user?.photoURL ? (
                        <img
                          className="w-10 h-10 rounded-full border"
                          src={user.photoURL}
                          alt=""
                        />
                      ) : (
                        <GeneratedProfileImage
                          name={user?.displayName || "user"}
                          size={40}
                        />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link
                          href="/dashboard/overview"
                          className="cursor-pointer w-full"
                        >
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/profile/edit-profile"
                          className="cursor-pointer w-full"
                        >
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/checkout"
                          className="cursor-pointer w-full"
                        >
                          Cart
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => logOut()}
                        className="cursor-pointer w-full"
                      >
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
                  className="primary-outline-btn px-3 py-2"
                >
                  login/ sign up
                </button>
              )}
            </div>
          </nav>
        </div>
        {!isDashboardPage && (
          <div
            name="navigation-header"
            className={`transition-all duration-300 ${
              isScrolled ? " bg-white" : "pt-[70px]"
            } w-full fixed top-0 flex items-center justify-start`}
          >
            <div className="relative">
              <div
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
                className="w-[298px] h-[52px] bg-black text-white flex items-center justify-between px-6 cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <IoReorderThree className="text-4xl" />
                  <span className="font-bold">CATEGORY</span>
                </div>

                <span
                  className={`
                    transition-all duration-300 select-none
                    ${
                      isCategoryOpen
                        ? "transform rotate-180"
                        : "transform rotate-0"
                    }
                  `}
                >
                  <FaChevronUp className="text-2xl" />
                </span>
              </div>
              <div
                className={`absolute flex flex-col ${
                  isCategoryOpen ? "block" : "hidden"
                }`}
              >
                <Menus
                  allMenus={allMenus}
                  setIsCategoryOpen={setIsCategoryOpen}
                />
              </div>
            </div>
            <div className="flex items-center">
              {allMenus.map((item, index) => (
                <NavigationItem key={index} name={item.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
