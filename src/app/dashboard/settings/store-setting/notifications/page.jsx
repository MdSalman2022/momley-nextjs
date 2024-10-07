import React from "react";

const NotificationPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full border-b py-2">
        <div className="flex flex-col">
          <p>Receive notification for order</p>
          <span className="text-xs text-[#4F4F4F]">
            Enable this option if you want to receive notification for new order
          </span>
        </div>
        <div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              checked={true}
            />
            <div className="peer h-[24px] w-[50px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#76EE59] peer-checked:after:translate-x-[26px] peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
      <div className="flex justify-between w-full border-b py-2">
        <div className="flex flex-col">
          <p>Receive notification for new message</p>
          <span className="text-xs text-[#4F4F4F]">
            Enable this option if you want to receive notification for new
            message
          </span>
        </div>
        <div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              checked={true}
            />
            <div className="peer h-[24px] w-[50px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#76EE59] peer-checked:after:translate-x-[26px] peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
      <div className="flex justify-between w-full border-b py-2">
        <div className="flex flex-col">
          <p>Receive notification for new review</p>
          <span className="text-xs text-[#4F4F4F]">
            Enable this option if you want to receive notification for new
            review
          </span>
        </div>
        <div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              checked={true}
            />
            <div className="peer h-[24px] w-[50px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#76EE59] peer-checked:after:translate-x-[26px] peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
