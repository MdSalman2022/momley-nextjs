import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileModalBox = ({ isModalOpen, setIsModalOpen, children }) => {
  const dropdownRef = useRef(null);

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 300, // start from the bottom
      transition: {
        type: "tween", // change transition type to 'tween'
        delay: 0.1,
      },
    },
    visible: {
      opacity: 1,
      y: 0, // end at the current position
      transition: {
        type: "tween", // change transition type to 'tween'
        delay: 0.1,
      },
    },
  };

  if (isModalOpen === true) {
    return (
      <AnimatePresence>
        <motion.div
          ref={dropdownRef}
          className="fixed right-0 bottom-0 z-[1000] w-full shadow-lg h-full bg-black bg-opacity-50 flex flex-col justify-end md:hidden"
        >
          <div
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="h-full "
          ></div>
          <motion.div
            className="rounded-md ring-1 ring-black ring-opacity-5 p-5 bg-white  rounded-t-3xl flex flex-col gap-5"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
          >
            <div className="flex flex-col">{children}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
};

export default MobileModalBox;
