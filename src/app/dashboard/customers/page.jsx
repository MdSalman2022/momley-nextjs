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
import CreateCustomerModal from "./CreateCustomerModal";
import CustomersTable from "./CustomersTable";
const Customers = () => {
  const pageName = "Customers";
  const pages = [
    "All",
    "New",
    "Returning",
    "Abandoned Checkout",
    "Email Subscribers",
    "From Bangladesh",
  ];
  const [activePage, setActivePage] = useState(pages[0]);

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  const paymentOptions = ["Paid", "Due", "Partial"];

  const [isCustomerCreateOpen, setIsCustomerCreateOpen] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title={pageName}
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
        handleFunction={() => setIsCustomerCreateOpen(true)}
        functionTitle="Add New Customer"
      />
      <div className="flex flex-col gap-5 p-6 border rounded">
        <div className="flex items-center gap-3">
          {pages.map((page, index) => (
            <button
              type="button"
              onClick={() => setActivePage(page)}
              key={index}
              className={`text-sm px-3 ${
                activePage === page
                  ? "border-b-2 border-black font-semibold"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Search customers"
          />
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Email subscribers status"
          />
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
          <CustomersTable />
          <CreateCustomerModal
            isOpen={isCustomerCreateOpen}
            setIsOpen={setIsCustomerCreateOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Customers;
