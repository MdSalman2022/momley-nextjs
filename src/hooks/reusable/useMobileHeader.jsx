"use client";
import { BsArrowLeft } from "react-icons/bs";

const useMobileHeader = ({
  setIsPrimaryMobileHeaderVisible,
  setSecondaryHeader,
  navigate,
  title,
  backAction,
}) => {
  const secondaryHeader = (
    <div className="flex items-center relative md:hidden px-4 justify-between w-screen py-4 border-b border-[#D0D5DD]">
      <button
        onClick={() => {
          setSecondaryHeader("");
          setIsPrimaryMobileHeaderVisible(true);
          if (backAction) {
            backAction();
          } else {
            navigate(-1);
          }
        }}
        className="w-8 h-8 rounded-full p-1"
        aria-label="Go back"
      >
        <BsArrowLeft />
      </button>
      <span className="font-semibold text-xl pr-5">{title}</span>
      <span></span>
    </div>
  );

  const showSecondaryHeader = () => {
    setIsPrimaryMobileHeaderVisible(false);
    setSecondaryHeader(secondaryHeader);
  };

  const hideSecondaryHeader = () => {
    setIsPrimaryMobileHeaderVisible(true);
    setSecondaryHeader("");
  };

  return { showSecondaryHeader, hideSecondaryHeader };
};

export default useMobileHeader;
