import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const PageCreate = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between font-medium">
        <p>
          Page <small>Create,edit and manage the pages on your site</small>
        </p>
        <div className="flex items-center gap-5">
          <button className="input-box rounded-none bg-green-600 gap-3 text-white px-10">
            Add new page
          </button>
        </div>
      </div>
      <div className="bg-white p-5">
        <div className="flex items-center gap-5 ">
          <p className={`border-b-2 py-2 border-black font-semibold`}>
            Published
          </p>
          <p className={`py-2`}>Draft</p>
          <p className={`py-2`}>Scheduled</p>
          <p className={`py-2`}>Trash</p>
        </div>
        <div className="flex justify-between items-center">
          <p>02 Page</p>
          <div className="flex py-5 gap-5">
            <input
              placeholder="Search page"
              type="text"
              className="input-box rounded-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <div className="flex justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox" />
              <div className="flex flex-col">
                <p className="text-sm font-normal">Blog</p>
                <small>7 hour ago</small>
              </div>
            </label>
            <button className="">
              <BsThreeDotsVertical className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreate;
