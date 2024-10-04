import React from "react";

const LoadingAnimationFloating = () => {
  return (
    <div className="absolute z-[1000] flex flex-col justify-center items-center w-full h-screen bg-black/10 cursor-wait">
      <div className="flex justify-center items-center h-screen w-60">
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-black rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-black rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimationFloating;
