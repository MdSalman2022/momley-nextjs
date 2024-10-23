import React from "react";

const EditPage = ({ params }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-black border-dashed h-60 flex items-center justify-center text-2xl">
        Banner
      </div>
      <div className="border border-black border-dashed h-60 flex items-center justify-center text-2xl">
        Categories
      </div>
      <div className="border border-black border-dashed h-60 flex items-center justify-center text-2xl">
        Brands
      </div>
      <div className="border border-black border-dashed h-60 flex items-center justify-center text-2xl">
        Products
      </div>
    </div>
  );
};

export default EditPage;
