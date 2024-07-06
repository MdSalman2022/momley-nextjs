"use client";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GrSearch } from "react-icons/gr";
import { useContext, useState } from "react";
import ModalBox from "./ModalBox";
import Login from "./Authentication/Login";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import MenuModal from "./MenuModal";
import Link from "next/link";
import CartIcon from "../../../public/images/CartIcon.svg";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";

const NavigationItem = ({ name }) => (
  <div className="w-48 h-12 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer">
    {name}
  </div>
);

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useContext(StateContext);

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const navItems = [
    { name: "Mom & Baby" },
    { name: "Bath & Shower" },
    { name: "Fragrance" },
    { name: "Makeup" },
    { name: "New Arrivals" },
    { name: "Weekly Offers" },
  ];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="flex mx-auto container w-full justify-center">
      <div className="bg-white flex flex-col fixed w-full">
        <div className="container mx-auto py-2">
          {isModalOpen && (
            <ModalBox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
              <Login setIsModalOpen={setIsModalOpen} />
            </ModalBox>
          )}
          <nav className="flex items-center justify-between">
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
              <button className="absolute right-1 top-1 rounded bg-black text-white flex items-center justify-center w-[87px] h-11">
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
                  <img
                    onClick={() => setIsMenuModalOpen(!isMenuModalOpen)}
                    className="w-10"
                    src={
                      user.photoURL ||
                      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    }
                    alt=""
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="primary-outline-btn px-3 py-2"
                >
                  login/ sign up
                </button>
              )}
              <MenuModal
                setIsMenuModalOpen={setIsMenuModalOpen}
                isMenuModalOpen={isMenuModalOpen}
              >
                <div className="w-32 flex flex-col  bg-white  items-end relative">
                  <Link
                    className="font-medium text-sm hover:font-semibold hover:bg-gray-200 w-full px-5 py-3 flex justify-end"
                    href="/profile"
                  >
                    Profile
                  </Link>
                  <Link
                    className="font-medium text-sm hover:font-semibold hover:bg-gray-200 w-full px-5 py-3 flex justify-end"
                    href="/checkout"
                  >
                    Cart
                  </Link>
                  <button
                    onClick={() => logOut()}
                    className="font-medium text-sm hover:font-semibold hover:bg-gray-200 w-full px-5 py-3 flex justify-end"
                  >
                    Log Out
                  </button>
                </div>
              </MenuModal>
            </div>
          </nav>
        </div>
        <div className="container mx-auto flex items-center justify-between">
          <div className="relative">
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-[298px] h-[52px] bg-black text-white flex items-center justify-between px-6 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <GiHamburgerMenu className="text-2xl" />
                <span className="font-bold">CATEGORY</span>
              </div>

              <span
                className={`
                transition-all duration-300 select-none
                ${
                  isCategoryOpen ? "transform rotate-180" : "transform rotate-0"
                }`}
              >
                <FaChevronUp className="text-2xl" />
              </span>
            </div>
            <div
              className={`absolute flex flex-col ${
                isCategoryOpen ? "block" : "hidden"
              } 
          }`}
            >
              {navItems.map((item, index) => (
                <Link key={index} href={`/category/${item.name}`}>
                  <div className="w-[298px] h-[52px] border-b bg-white text-black flex items-center justify-between px-6">
                    <span className="">{item.name}</span>
                    <FaChevronRight />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {navItems.map((item, index) => (
              <NavigationItem key={index} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
