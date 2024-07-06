import React from "react";

const MySetting = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg">Setting</p>

      <div className="border p-5 bg-white">
        <div className="flex gap-10 w-full border-b">
          <p className="py-3 border-b border-black">Basic Setting</p>
          <p className="py-3">Privacy Setting</p>
        </div>
        <div className="py-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Show full pickup address</p>
              <p className="text-sm font-normal">
                Enable this option if you want to show your shop's self pick up
                location, including unit number.
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-success"
            />
          </div>
        </div>
        <div className="py-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Vacation Mode</p>
              <p className="text-sm font-normal">Including unit number.</p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-success"
            />
          </div>
        </div>
        <div className="py-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">Auto-reply</p>
              <p className="text-sm font-normal">including unit number.</p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-success"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySetting;
