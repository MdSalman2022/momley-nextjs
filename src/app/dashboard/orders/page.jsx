"use client";
import React, { useState } from "react";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateOrderModal from "./CreateOrderModal";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  const [searchText, setSearchText] = useState("");
  const pages = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "return_refund", label: "Return/Refund" },
  ];
  const [activePage, setActivePage] = useState(pages[0]?.value);
  const paymentOptions = ["Paid", "Due", "Partial"];

  console.log("activePage", activePage);
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Orders"
        onExport={() => console.log("Exporting...")}
        handleFunction={() => setIsOpen(true)}
        functionTitle="Create Order"
      />
      <div className="flex flex-col gap-5 p-6 border rounded">
        <div className="flex items-center gap-3">
          {pages.map((page, index) => (
            <button
              type="button"
              onClick={() => setActivePage(page?.value)}
              key={index}
              className={`text-sm px-3 ${
                activePage === page?.value
                  ? "border-b-2 border-black font-semibold"
                  : ""
              }`}
            >
              {page?.label}
            </button>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Search Order"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/*  <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Payments Status"
          /> */}
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-40 h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
              <SelectValue placeholder="Payments Status" />
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((option, index) => (
                // Ensure each SelectItem has a unique key
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button type="button" className="primary-btn">
            Search
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <OrdersTable activePage={activePage} searchText={searchText} />
          <CreateOrderModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
