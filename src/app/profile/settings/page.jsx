import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

function Option({ title, description }) {
  return (
    <div className="py-3 border-b">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm font-normal">{description}</p>
        </div>
        <Checkbox className="toggle-success" />
      </div>
    </div>
  );
}

const MySetting = () => {
  return (
    <div className="space-y-5">
      <p className="text-lg">Setting</p>

      <div className="border px-4 py-6 bg-white">
        <div className="flex gap-10 w-full border-b">
          <p className="pb-3 border-b border-black">Basic Setting</p>
          <p className="pb-3">Privacy Setting</p>
        </div>
        <>
          <Option
            title="Show full pickup address"
            description="Enable this option if you want to show your shop's self pick up location, including unit number."
          />
          <Option title="Vacation Mode" description="Including unit number." />
          <Option title="Auto-reply" description="including unit number." />
        </>
      </div>
    </div>
  );
};

export default MySetting;
