"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React from "react";
import moveIcon from "@/../public/images/icons/moveIcon.svg";
import Image from "next/image";

const Navigation = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Navigation"
        handleFunction={() => console.log("Creating Order...")}
        functionTitle="Add Menu "
      />

      <div className="flex flex-col gap-5 w-full">
        <div className="border px-6 py-6 rounded">
          <div className="flex items-center h-10 border-b">
            <p className="w-[10%]">Menu</p>
            <p className="w-[80%]">Items</p>
            <p className="w-[10%]">Action</p>
          </div>
          <div className="flex items-center h-10 py-6">
            <p className="w-[10%]">Main Menu</p>
            <p className="w-[80%]">
              Home, Mom & Baby, Bath & Shower, Makeup, Weekly offer{" "}
            </p>
            <p className="w-[10%] text-[#2F80ED]">Add item</p>
          </div>
          <div className="flex items-center h-10">
            <p className="w-[10%]">Footer Meno</p>
            <p className="w-[80%]">Service, Infromation, Contact us </p>
            <p className="w-[10%] text-[#2F80ED]">Add item</p>
          </div>
        </div>
        <TopActionButtons
          title="Category"
          handleFunction={() => console.log("Creating Order...")}
          functionTitle="Add Category"
        />
        <div className="border px-6 py-6 rounded">
          <div className="flex items-center h-10  border-b">
            <p className="w-[10%]">Category</p>
            <p className="w-[80%]">Items</p>
            <p className="w-[10%]">Action</p>
          </div>
          <div className="flex items-center h-10 py-6">
            <p className="w-[10%]">Main Menu</p>
            <p className="w-[80%]">
              Home, Mom & Baby, Bath & Shower, Makeup, Weekly offer{" "}
            </p>
            <p className="w-[10%] text-[#2F80ED]">Add item</p>
          </div>
          <div className="flex items-center h-10">
            <p className="w-[10%]">Sub-Category</p>
            <p className="w-[80%]">
              Shirt, T-Shirt, Pant, Sari, Panjabi, Skin Care, Body Care, View
              all{" "}
            </p>
            <p className="w-[10%] text-[#2F80ED]">Add item</p>
          </div>
          <div className="flex items-center h-10">
            <p className="w-[10%]">Sub-Sub-Category</p>
            <p className="w-[80%]">
              Shirt, T-Shirt, Pant, Sari, Panjabi, Skin Care, Body Care, View
              all{" "}
            </p>
            <p className="w-[10%] text-[#2F80ED]">Add item</p>
          </div>
        </div>
        <div className="border px-6 py-6 rounded flex flex-col gap-3">
          <div className="flex items-center justify-between h-10 border-b">
            <p className="font-semibold">Filter</p>
            <p className="w-[10%] flex justify-start text-[#2F80ED]">
              Add Filter
            </p>
          </div>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-5">
              <span>
                <Image src={moveIcon} alt="moveIcon" />
              </span>
              <p className="font-semibold">Price</p>
            </div>
            <p className="w-[10%] flex justify-start text-[#EB5757]">Delete</p>
          </div>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-5">
              <span>
                <Image src={moveIcon} alt="moveIcon" />
              </span>
              <p className="font-semibold">Availability</p>
            </div>
            <p className="w-[10%] flex justify-start text-[#EB5757]">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
