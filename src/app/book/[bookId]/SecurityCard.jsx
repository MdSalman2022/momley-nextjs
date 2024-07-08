import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";

const SecurityCard = () => {
  return (
    <div className="flex flex-col gap-3 text-sm border rounded-lg p-5">
      <div className="flex flex-nowrap items-center gap-5 py-3 border-b">
        <MdOutlineSecurityUpdateGood className="text-3xl" />
        <div className="flex flex-col">
          <p className="font-semibold">SECURED PAYMENT</p>
          <p>We ensure secure payment</p>
        </div>
      </div>
      <div className="flex flex-nowrap items-center gap-5 py-3 border-b">
        <FaShippingFast className="text-3xl" />
        <div className="flex flex-col">
          <p className="font-semibold">FREE SHIPPING</p>
          <p>ON ALL Tk above 700 TK</p>
        </div>
      </div>
      <div className="flex flex-nowrap items-center gap-5 py-3 ">
        <SiMoneygram className="text-3xl" />
        <div className="flex flex-col">
          <p className="font-semibold">MONEY BACK GUARANTEE</p>
          <p>Any back within 7 days </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityCard;
