import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";

const HeadlessModalBox = ({ isOpen, setIsOpen, title, children }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/55 px-6 py-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex justify-between">
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                {title}
              </DialogTitle>
              <span onClick={handleClose} className="text-2xl cursor-pointer">
                <RxCross2 />
              </span>
            </div>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default HeadlessModalBox;