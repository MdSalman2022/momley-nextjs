"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const ResetButton = () => {
  const { filterBooks, setFilterBooks } = useContext(StateContext);
  return (
    <span
      onClick={() => setFilterBooks("")}
      className="text-xs text-blue-600 cursor-pointer"
    >
      Reset
    </span>
  );
};

export default ResetButton;
