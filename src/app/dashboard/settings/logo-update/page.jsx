"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons title={"Logo Update"} />
      <div className="border p-4 flex flex-col gap-3">
        <p>Main Logo</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-3">
            <Image
              src="https://i.ibb.co/TW8T2kc/logo-momley.png"
              width={234}
              height={51}
            />
            <button type="button" className="primary-btn">
              Choose a file
            </button>
          </div>
          <button
            type="button"
            className="primary-btn bg-[#219653] hover:bg-[#1d6d40] w-[190px] flex justify-center"
          >
            Save
          </button>
        </div>
      </div>
      <div className="border p-4 flex flex-col gap-3">
        <p>Invoice Logo</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-3">
            <Image
              src="https://i.ibb.co/TW8T2kc/logo-momley.png"
              width={234}
              height={51}
            />
            <button type="button" className="primary-btn">
              Choose a file
            </button>
          </div>
          <button
            type="button"
            className="primary-btn bg-[#219653] hover:bg-[#1d6d40] w-[190px] flex justify-center"
          >
            Save
          </button>
        </div>
      </div>
      <div className="border p-4 flex flex-col gap-3">
        <p>Navigation Logo</p>
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-3">
            <Image
              src="https://i.ibb.co/TW8T2kc/logo-momley.png"
              width={234}
              height={51}
            />
            <button type="button" className="primary-btn">
              Choose a file
            </button>
          </div>
          <button
            type="button"
            className="primary-btn bg-[#219653] hover:bg-[#1d6d40] w-[190px] flex justify-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
