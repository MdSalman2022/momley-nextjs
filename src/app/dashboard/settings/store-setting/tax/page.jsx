"use client";
import React, { useState } from "react";

const TaxPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState("");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    setTaxPercentage(e.target.value);
  };

  const handleSave = () => {
    // Save the tax percentage logic here
    console.log("Tax Percentage Saved:", taxPercentage);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Sales Tax</p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      {isChecked && (
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={taxPercentage}
            onChange={handleInputChange}
            placeholder="Enter tax percentage"
            className="border p-2 rounded"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TaxPage;
