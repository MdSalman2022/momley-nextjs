"use client";
import React, { useState } from "react";

const ProductDescription = ({ bookDetails }) => {
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      {" "}
      <div className="flex flex-col py-10">
        <div className="flex gap-10 py-5">
          <span
            className={`cursor-pointer border-b-2 ${
              activeTab === "description"
                ? "border-black"
                : "border-transparent"
            }`}
            onClick={() => handleTabClick("description")}
          >
            Description
          </span>
          <span
            className={`cursor-pointer border-b-2 ${
              activeTab === "specification"
                ? "border-black"
                : "border-transparent"
            }`}
            onClick={() => handleTabClick("specification")}
          >
            Specification
          </span>
          <span
            className={`cursor-pointer border-b-2 ${
              activeTab === "review" ? "border-black" : "border-transparent"
            }`}
            onClick={() => handleTabClick("review")}
          >
            Review
          </span>
        </div>

        <div className="flex flex-col gap-5 mr-2">
          {activeTab === "description" && (
            <p>
              {bookDetails.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
          {activeTab === "specification" && (
            <div className="flex flex-col gap-1">
              {bookDetails?.specifications ? (
                <span className="flex flex-col gap-1">
                  {Object.entries(bookDetails.specifications).map(
                    ([label, value]) => (
                      <span key={label}>
                        <strong>{label}:</strong> {value}
                      </span>
                    )
                  )}
                </span>
              ) : (
                <div>No specifications available.</div>
              )}
            </div>
          )}
          {activeTab === "review" && <div>Review Content</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
