"use client";
import React, { useState } from "react";

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState("Privacy Policy");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    return (
      <div className="border p-4 rounded bg-white">
        <h2 className="text-xl font-semibold">{activeTab}</h2>
        <p className="text-sm text-gray-600 mb-4">
          Customize your privacy policy to ensure customer trust and legal
          compliance.
        </p>
        <textarea
          className="border p-2 rounded w-full mb-4"
          rows="10"
          placeholder={`Enter your ${activeTab.toLowerCase()} here`}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        {["Privacy Policy", "Refund Policy", "Terms & Conditions"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-sm px-3 py-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>
      {renderContent()}
    </div>
  );
};

export default PoliciesPage;
