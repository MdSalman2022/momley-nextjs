import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tags.length >= 10) {
        toast.error("You can only add up to 10 tags.");
        return;
      }
      if (inputValue.trim()) {
        if (tags.includes(inputValue.trim())) {
          toast.error("Duplicate tags are not allowed.");
          return;
        }
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      e.preventDefault();
      if (tags.length > 0) {
        setTags(tags.slice(0, -1));
      }
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor="tags">
        Tags
      </label>
      <div className="flex flex-wrap items-center gap-2 p-2 border border-[#11111170] rounded-lg focus-within:outline-1 focus-within:outline focus-within:outline-slate-500">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 border rounded-lg bg-slate-100 border-slate-400 text-xs"
          >
            {tag}
            <RxCross2
              className="cursor-pointer"
              onClick={() => handleRemoveTag(index)}
            />
          </div>
        ))}
        <input
          type="text"
          className="flex-grow outline-none h-auto text-xs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <span className="text-xs text-slate-400">Max 10 tags</span>
    </div>
  );
};

export default TagsInput;
