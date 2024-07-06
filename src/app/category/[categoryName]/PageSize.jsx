"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const PageSize = () => {
  const { setPageSize, pageSize } = useContext(StateContext);

  return (
    <div>
      <select
        className="bg-gray-300 p-1 rounded-lg"
        name="pagesize"
        id=""
        onChange={(e) => setPageSize(e.target.value)}
        defaultValue={pageSize}
      >
        <option value={10} selected>
          10
        </option>
        <option value={20} selected>
          20
        </option>
        <option value={30} selected>
          30
        </option>
        <option value={40} selected>
          40
        </option>
      </select>
    </div>
  );
};

export default PageSize;
