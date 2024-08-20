"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchSection = ({ search }) => {
  const router = useRouter();
  const formattedSearch =
    typeof search === "string" ? search.replace(/-/g, " ") : "";

  const [searchTerm, setSearchTerm] = useState(formattedSearch || "");

  const handleSearch = async () => {
    const formattedSearchTerm = searchTerm.replace(/\s+/g, "-");
    router.push(`/search-product/${formattedSearchTerm}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center h-60 w-full rounded-xl bg-gray-100">
        <p>
          Search results for <span className="font-semibold">"{search}"</span>
        </p>
        <div className="flex items-center gap-1">
          <input
            type="text"
            className="input-box w-96 h-10"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="primary-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
