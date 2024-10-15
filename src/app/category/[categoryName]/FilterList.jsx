import { usePathname, useRouter } from "next/navigation";
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
  console.log("items", items);
  const pathname = usePathname();
  console.log(
    "selectedItem",
    selectedItem,
    !pathname.includes("search-product")
  );
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
  const getItemCount = (itemName) => {
    return items.filter((item) => item[itemType] === itemName).length;
  };

  const handleRadioChange = (itemValue, filterType, slug) => {
    if (selectedItem === itemValue) {
      setSelectedItem(null);
      handleSearch(filterType, "");
      UpdateSearch(filterType);
    } else {
      if (pathname.includes("search-product")) {
        setSelectedItem(itemValue);
        handleSearch(filterType, itemValue);
      } else if (slug) {
        router.push(`/category/${slug}`);
      } else {
        setSelectedItem(itemValue);
        handleSearch(filterType, itemValue);
      }
    }
  };

  return (
    <div>
      {items?.length > 0 &&
        items?.map((item, index) => (
          <label
            key={index}
            className="flex justify-start gap-5 cursor-pointer border-b last:border-0"
          >
            <input
              type="radio"
              name={itemType}
              className="radio radio-sm"
              checked={selectedItem === item[itemType]}
              // onChange={() => handleRadioChange(item[itemType], itemType)}
              onClick={() => {
                console.log(
                  "condition check",
                  item[itemType],
                  itemType,
                  item?.slug
                );
                handleRadioChange(item[itemType], itemType, item?.slug);
              }}
            />
            <div className="flex gap-5 py-3">
              <span className="transition-all duration-200 cursor-pointer font-medium hover:font-semibold capitalize flex items-center gap-1">
                {item[itemType]} ({item?.count || "0"}){" "}
                {getItemCount(item[itemType]) > 1 &&
                  itemType === "category" && (
                    <span className="text-xs"> - {item?.parentCategory}</span>
                  )}
              </span>
            </div>
          </label>
        ))}
    </div>
  );
};

export default FilterList;
