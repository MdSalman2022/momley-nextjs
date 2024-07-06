"use client";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import ModalBox from "./ModalBox";
import Login from "./Authentication/Login";
import { StateContext } from "../../contexts/StateProvider/StateProvider";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import MenuModal from "./MenuModal";
import Link from "next/link";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useContext(StateContext);

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <div className="bg-white">
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
            <input type="text" className="input-box w-96 h-10 rounded-lg" />
            <button className="absolute right-1 top-2 rounded bg-black text-white flex items-center justify-center w-10 h-8">
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border-r px-5 gap-2">
              <FiPhoneCall className="text-xl" />
              <div className="flex flex-col text-sm">
                <span>Call Now</span>
                <span>+8801812141241</span>
              </div>
            </div>
            <div className="flex flex-col px-5">
              Bag <span>0.00</span>
            </div>
            <Link href="/checkout" className="relative">
              <HiOutlineShoppingBag className="text-3xl" />
              <span className="absolute top-0 right-0 w-3 text-xs rounded-full text-white bg-red-500 flex justify-center">
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
    </div>
  );
};

export default Header;
