"use client";
import React, { useState } from "react";
import StartDate from "./StartDate";

const RadioGroup = ({ label, selectedValue, options, onChange }) => {
  return (
    <div className="flex flex-col border rounded p-6">
      <label className="block mb-2 font-semibold">{label}</label>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option.value} className="mr-4">
            <input
              type="radio"
              name={label.toLowerCase().replace(/ /g, "-")}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

const DiscountPage = () => {
  const [discountType, setDiscountType] = useState("percentage");
  const [appliesTo, setAppliesTo] = useState("all-products");
  const [minimumRequirement, setMinimumRequirement] = useState("none");
  const [customerEligibility, setCustomerEligibility] = useState("everyone");

  const discountTypeOptions = [
    { label: "Percentage", value: "percentage" },
    { label: "Fixed Amount", value: "fixed-amount" },
    { label: "Free Shipping", value: "free-shipping" },
    { label: "Buy 2 Get 1", value: "buy-2-get-1" },
  ];

  const appliesToOptions = [
    { label: "All Products", value: "all-products" },
    { label: "Specific Collections", value: "specific-collections" },
    { label: "Specific Products", value: "specific-products" },
  ];

  const minimumRequirementOptions = [
    { label: "None", value: "none" },
    { label: "Minimum purchase amount(BDT)", value: "minimum-purchase-amount" },
    { label: "Minimum quantity of items", value: "minimum-quantity-of-items" },
  ];

  const customersEligibilityOptions = [
    { label: "Everyone", value: "everyone" },
    {
      label: "Specific groups of customers",
      value: "specific-groups-of-customers",
    },
    { label: "Specific customers", value: "specific-customers" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Discount Code</h1>

      <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-10">
        <div className="col-span-2 bg-white flex flex-col gap-6">
          <div className="border p-6 rounded">
            <div className="flex justify-between">
              <label className="mb-2 block font-semibold ">Discount Code</label>
              <button className="mb-2  text-[#2D9CDB]">Generate Code</button>
            </div>
            <input
              type="text"
              placeholder="e.g. SPRINGSALE"
              className="border p-2 w-full"
            />
          </div>

          <RadioGroup
            label="Type"
            selectedValue={discountType}
            options={discountTypeOptions}
            onChange={setDiscountType}
          />

          <div className="border p-6 rounded ">
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Value</label>
              <label className="block mb-2 capitalize">{discountType}</label>
              <input
                type="number"
                placeholder="%"
                className="border p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Applies to</label>
              <div className="flex flex-col gap-2">
                {appliesToOptions.map((option) => (
                  <label key={option} className="mr-4">
                    <input
                      type="radio"
                      name="appliesTo"
                      value={option.value?.toLowerCase().replace(/ /g, "-")}
                      checked={
                        appliesTo ===
                        option.value?.toLowerCase().replace(/ /g, "-")
                      }
                      onChange={() =>
                        setAppliesTo(
                          option.value?.toLowerCase().replace(/ /g, "-")
                        )
                      }
                      className="mr-2"
                    />
                    {option?.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <RadioGroup
            label="Minimum requirements"
            selectedValue={minimumRequirement}
            options={minimumRequirementOptions}
            onChange={setMinimumRequirement}
          />
          <RadioGroup
            label="Customers eligibility"
            selectedValue={customerEligibility}
            options={customersEligibilityOptions}
            onChange={setCustomerEligibility}
          />

          <div className="border rounded p-6 ">
            <label className="block mb-2 font-semibold">Usage limits</label>
            <div>
              <label className="block">
                <input type="checkbox" className="mr-2" />
                Limit number of times discount can be used in total
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" />
                Limit to one use per customer
              </label>
            </div>
          </div>

          <div className="border rounded p-6 w-full">
            <div className="flex gap-4 w-full">
              {/* <div>
                <label className="block mb-2">Start Date</label>
                <input type="date" className="border p-2 w-full" />
              </div> */}
              <div className="flex flex-col">
                <label className="block mb-2 font-semibold">Active date</label>
                <StartDate />
              </div>
              <div>
                <label className="block mb-2">Time Start</label>
                <input type="time" className="border p-2 w-[310px] h-9" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="bg-[#BDBDBD] primary-btn">Cancel</button>
            <button className="bg-[#BDBDBD] primary-btn">Save and Draft</button>
            <button className="primary-btn">Save and Publish</button>
          </div>
        </div>
        <div className="col span-1 flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="border p-4">
              <p className="font-semibold">Summary</p>
              <p>No information entered yet.</p>
            </div>
            <div className="border p-4">
              <p className="font-semibold">Performance</p>
              <p>Discount is not active yet.</p>
            </div>
          </div>
          <div className="border p-4">
            <p className="font-semibold">
              Can’t combine with other automatic discount
            </p>
            <p>
              Customer won’t be able to enter a code if an automic discount is
              already applied at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
