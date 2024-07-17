import React from "react";
import { CgClose } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

const ModalBox = ({ isModalOpen, setIsModalOpen, children }) => {
  if (isModalOpen === true) {
    return (
      <div>
        <div className="fixed z-10 inset-0 overflow-auto mx-5 md:mx-0">
          <div className="flex items-center justify-center min-h-screen">
            <div
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="relative bg-primary dark:bg-base-100 rounded-[20px] overflow-hidden shadow-xl transform transition-all w-full sm:w-fit flex flex-wrap h-full">
              <CgClose
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="cursor-pointer hover:text-blue-500 absolute top-3 right-3 text-2xl"
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalBox;
