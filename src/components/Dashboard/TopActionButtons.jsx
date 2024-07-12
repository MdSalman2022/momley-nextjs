"use client";
import React from "react";
import { FiPlus } from "react-icons/fi";

const TopActionButtons = ({
  title,
  onExport,
  onImport,
  handleFunction,
  functionTitle,
}) => {
  return (
    <div className="w-full flex justify-between">
      <p className="font-semibold">{title}</p>
      <span className="flex items-center gap-5">
        {onExport && (
          <button
            type="button"
            className="w-28 h-10 font-semibold cursor-pointer"
            onClick={onExport}
          >
            Export
          </button>
        )}
        {onImport && (
          <button
            type="button"
            className="w-28 h-10 font-semibold cursor-pointer"
            onClick={onImport}
          >
            Import
          </button>
        )}
        {handleFunction && (
          <button
            type="button"
            className="min-w-[210px] flex items-center justify-center gap-2 primary-btn bg-[#219653] hover:bg-[#1a6239]"
            onClick={handleFunction}
          >
            <span className="text-xl">
              <FiPlus />
            </span>
            <span>{functionTitle}</span>
          </button>
        )}
      </span>
    </div>
  );
};

export default TopActionButtons;
