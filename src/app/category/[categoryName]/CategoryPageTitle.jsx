"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const CategoryPageTitle = () => {
  const { writerName } = useContext(StateContext);

  return <p>{writerName || "All Books"} </p>;
};

export default CategoryPageTitle;
