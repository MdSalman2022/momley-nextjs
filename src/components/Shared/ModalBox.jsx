import React from "react";
import { CgClose } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

const ModalBox = ({ isModalOpen, setIsModalOpen, children }) => {
  useEffect(() => {
    if (isModalOpen) {
      // lock scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // unlock scroll when modal is closed
      document.body.style.overflow = "auto";
    }

    // cleanup function to unlock scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

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
            <div className="relative dark:bg-base-100 rounded-[20px] overflow-hidden   transform transition-all sm:w-fit  flex flex-wrap h-full p-5">
              <CgClose
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="cursor-pointer text-black hover:text-blue-500 absolute top-7 right-7 z-50 text-2xl"
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
