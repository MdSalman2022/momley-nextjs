"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React from "react";

const NewPageCreate = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg w-full mx-auto">
      <form className="flex flex-col gap-4">
        <div className="mb-6">
          <TopActionButtons
            title="Add New Page"
            subtitle={<div className="flex items-center gap-1"></div>}
            handleFunction={() => console.log("object")}
            functionTitle="Save"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pageTitle" className="mb-2 font-medium">
            Page Title
          </label>
          <input
            type="text"
            id="pageTitle"
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter page title"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pageLink" className="mb-2 font-medium">
            Page Link
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <span className="p-2 bg-gray-100 text-gray-600">momley.com/</span>
            <input
              type="text"
              id="pageLink"
              className="p-2 flex-1 border-0 focus:ring-0"
              placeholder="Enter page path"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pageContent" className="mb-2 font-medium">
            Page Content
          </label>
          <textarea
            id="pageContent"
            className="p-2 border border-gray-300 rounded h-40"
            placeholder="Enter page content"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default NewPageCreate;
