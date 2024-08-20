import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FilterList = ({
  items,
  selectedItem,
  setSelectedItem,
  itemType,
  handleSearch,
  query,
  params,
}) => {
  console.log("selectedItem", selectedItem);
  const router = useRouter();

  const UpdateSearch = async (filterType) => {
    let searchParams = new URLSearchParams(query);
    searchParams.delete(filterType);

    const queryString = searchParams.toString();
    const searchText = params?.search;
    const url = searchText
      ? `/search-product/${searchText}?${queryString}`
      : `/search-product?${queryString}`;
    router.push(url);
  };

  const handleRadioChange = (itemValue, filterType) => {
    if (selectedItem === itemValue) {
      setSelectedItem(null); // or setSelectedItem("") if you prefer an empty string
      handleSearch(filterType, ""); // Clear the filter
      UpdateSearch(filterType); // Trigger the new search
    } else {
      setSelectedItem(itemValue);
      handleSearch(filterType, itemValue);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <label
          key={index}
          className="flex justify-start gap-5 cursor-pointer border-b last:border-0"
        >
          <input
            type="radio"
            name={itemType}
            className="radio radio-sm"
            checked={selectedItem === item[itemType]}
            onChange={() => handleRadioChange(item[itemType], itemType)}
            onClick={() => handleRadioChange(item[itemType], itemType)}
          />
          <div className="flex gap-5 py-3">
            <span className="transition-all duration-200 cursor-pointer font-medium hover:font-semibold capitalize">
              {item[itemType]} ({item?.count || "0"})
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default FilterList;
