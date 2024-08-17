import { FaChevronDown } from "react-icons/fa";
import { IoReorderThree } from "react-icons/io5";

const CategoryNav = () => {
  return (
    <div className="container mx-auto hidden md:block">
      <div className="grid grid-cols-6 gap-20 justify-items-stretch">
        <span className="col-span-2 flex items-center justify-between p-3 bg-black text-white py-3  w-60">
          <div className="flex items-center gap-3">
            <IoReorderThree className="text-xl" /> Categories{" "}
          </div>
          <FaChevronDown />
        </span>
        <div className="col-span-4 flex items-center justify-around">
          <span>Mom & Baby</span>
          <span>Bath & Shower</span>
          <span>Fragrance</span>
          <span>Makeup</span>
          <span>New Arrivals</span>
          <span>Weekly Offers</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
