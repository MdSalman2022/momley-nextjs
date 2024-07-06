"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Player
        className="w-80 md:w-52 object-cover"
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_p8bfn5to.json"
      ></Player>
    </div>
  );
};

export default Loading;
