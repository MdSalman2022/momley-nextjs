"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useState } from "react";

const Setting = () => {
  const pages = ["Basic Setting", "Privacy Setting", "Notification Setting"];

  const [activePage, setActivePage] = useState(pages[0]);

  const [showFullPickupAddress, setShowFullPickupAddress] = useState(true);
  const [vacationMode, setVacationMode] = useState(false);
  const [autoReply, setAutoReply] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons title={"Setting"} />

      <div className="border rounded p-6 flex flex-col">
        <div className="flex gap-5">
          {pages.map((page, index) => (
            <button
              type="button"
              onClick={() => setActivePage(page)}
              key={index}
              className={`text-sm px-3 py-2 ${
                activePage === page
                  ? "border-b-2 border-black font-semibold"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-5 px-10 py-3">
          <div className="flex justify-between w-full border-b py-2">
            <div className="flex flex-col">
              <p>Show full pickup address</p>
              <span className="text-light text-[#4F4F4F]">
                Enable this option if you want to show your shop's self pick up
                location, including unit number.
              </span>
            </div>
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="switch"
                  type="checkbox"
                  className="peer sr-only"
                  checked={showFullPickupAddress}
                />
                <div className="peer h-[24px] w-[50px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#76EE59] peer-checked:after:translate-x-[26px] peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
          <div className="flex justify-between w-full border-b py-2">
            <div className="flex flex-col">
              <p>Vacation Mode</p>
              <span className="text-light text-[#4F4F4F]">
                including unit number.
              </span>
            </div>
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="switch"
                  type="checkbox"
                  className="peer sr-only"
                  checked={vacationMode}
                />
                <div className="peer h-[24px] w-[50px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#76EE59] peer-checked:after:translate-x-[26px] peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
          <div className="flex justify-between w-full border-b py-2">
            <div className="flex flex-col">
              <p>Auto-reply</p>
              <span className="text-light text-[#4F4F4F]">
                including unit number.
              </span>
            </div>
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  id="switch"
                  type="checkbox"
                  className="peer sr-only"
                  checked={autoReply}
                />
                <div className="peer h-[24px] w-[50px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-[20px] after:w-[20px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#76EE59] peer-checked:after:translate-x-[26px] peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
