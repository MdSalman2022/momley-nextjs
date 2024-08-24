"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import GeneratedProfileImage from "@/components/Shared/GeneratedProfileImage";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProductDescription = ({ bookDetails }) => {
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
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
            Review ({bookDetails?.reviews?.length || 0})
          </span>
        </div>

        <div className="flex flex-col gap-5 mr-2">
          {activeTab === "description" && bookDetails?.description && (
            <ReactQuill
              value={bookDetails?.description}
              readOnly={true}
              modules={{ toolbar: false }}
            />
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
          {activeTab === "review" && (
            <div className="flex flex-col gap-3">
              {bookDetails?.reviews?.map((review) => (
                <div
                  key={review._id}
                  className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4 bg-white w-full"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full   flex items-center justify-center">
                      <GeneratedProfileImage
                        name={review?.customerId?.firstName || "user"}
                        size={40}
                      />
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-gray-800">
                        {review.customerId?.firstName}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700">{review.reviewText}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">
                      {Array(review.rating).fill("⭐")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
