"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";

const PageCreate = () => {
  const pages = ["Published", "Draft", "Scheduled", "Trashed"];
  const [activePage, setActivePage] = useState(pages[0]);

  const router = useRouter()

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Page"
        subtitle={
          <div className="flex items-center gap-1">
            Create, edit, and manage the pages on your site.
            <span className="text-blue-600">Learn more</span>
          </div>
        }
        handleFunction={() => router.push('/dashboard/page-create/add')}
        functionTitle="Add new page"
      />
      <div className="flex flex-col gap-5 border p-6 rounded">
        <div className="flex items-center gap-3 ">
          {pages.map((page, index) => (
            <button
              type="button"
              onClick={() => setActivePage(page)}
              key={index}
              className={`text-sm px-3 ${
                activePage === page
                  ? "border-b-2 border-black font-semibold"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-b py-3">
          <p>02 Page</p>
          <div className="flex items-center gap-3 relative">
            <input
              type="text"
              className="input-box w-[310px] h-[35px] pl-3 rounded bg-[#F2F2F2]"
              placeholder="Search page"
            />
            <button className="absolute right-3 mt-2 rounded flex items-center justify-center h-[18px] w-[18px] text-[#828282]">
              <GrSearch className="text-xl" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Preview</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2 flex items-center gap-3">
              <Checkbox aria-label="Select all" />
              <div className="flex flex-col">
                <p className="">Blog</p>
              </div>
            </td>
            <td className="px-4 py-2">7 hours ago</td>
            <td className="px-4 py-2 underline text-blue-600">View</td>
            <td className="px-4 py-2">
              <FaEllipsisVertical />
            </td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2 flex items-center gap-3">
              <Checkbox aria-label="Select all" />
              <div className="flex flex-col">
                <p className="">Product</p>
              </div>
            </td>
            <td className="px-4 py-2">7 hours ago</td>
            <td className="px-4 py-2 underline text-blue-600">View</td>
            <td className="px-4 py-2">
              <FaEllipsisVertical />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
};

export default PageCreate;
