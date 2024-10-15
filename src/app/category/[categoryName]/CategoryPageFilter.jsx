"use client";
import React, { useEffect, useState } from "react";
import AuthorsList from "./AuthorsList";
import CategoryList from "./CategoryList";
import PriceRange from "./PriceRange";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FilterList from "./FilterList";
import { usePathname, useRouter } from "next/navigation";
import { IoOptionsOutline } from "react-icons/io5";
import ModalBox from "@/components/Shared/ModalBox";
import MobileModalBox from "@/components/Shared/MobileModalBox";

const CategoryPageFilter = ({
  allCategories,
  brands,
  colors,
  params,
  query,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();

  console.log("pathname", pathname);

  // State variables for section visibility
  const [showPrice, setShowPrice] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [showBrands, setShowBrands] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (query) {
      if (query.color) {
        setSelectedColor(query.color);
      }
      if (query.brand) {
        setSelectedBrand(query.brand);
      }
      if (query.category) {
        setSelectedCategory(query.category);
      }
      if (query.min && query.max) {
        setPriceRange({ min: query.min, max: query.max });
      }
    }
  }, [params]);

  console.log("query", query);
  console.log("selectedColor", selectedColor);
  console.log("colors", colors);
  console.log("allCategories", allCategories);
  console.log("brands", brands);
  console.log("priceRange", priceRange);
  const handleSearch = async (item, itemValue) => {
    let searchParams = new URLSearchParams();
    console.log("searchParams", searchParams);

    if (item === "color") {
      setSelectedColor(itemValue);
      if (itemValue) {
        searchParams.set("color", itemValue);
      }
    } else if (item === "brand") {
      setSelectedBrand(itemValue);
      if (itemValue) {
        searchParams.set("brand", itemValue);
      }
    } else if (item === "category") {
      setSelectedCategory(itemValue);
      if (itemValue) {
        searchParams.set("category", itemValue);
      }
    } else if (item === "price") {
      setPriceRange(itemValue);
      if (itemValue) {
        if (itemValue.min) {
          searchParams.set("min", Number(itemValue.min));
        }
        if (itemValue.max) {
          searchParams.set("max", Number(itemValue.max));
        }
      }
    }

    // Add existing filters to the searchParams
    if (selectedColor && item !== "color") {
      searchParams.set("color", selectedColor);
    }
    if (selectedBrand && item !== "brand") {
      searchParams.set("brand", selectedBrand);
    }
    if (selectedCategory && item !== "category") {
      searchParams.set("category", selectedCategory);
    }
    if (priceRange) {
      if (priceRange.min && item !== "price") {
        searchParams.set("min", Number(priceRange.min));
      }
      if (priceRange.max && item !== "price") {
        searchParams.set("max", Number(priceRange.max));
      }
    }

    const queryString = searchParams.toString();
    const searchText = params?.search;
    const url = searchText
      ? `/search-product/${searchText}?${queryString}`
      : `/search-product?${queryString}`;
    router.push(url);
  };
  // Toggle functions for each section
  const togglePrice = () => setShowPrice(!showPrice);
  const toggleColors = () => setShowColors(!showColors);
  const toggleBrands = () => setShowBrands(!showBrands);
  const toggleCategories = () => setShowCategories(!showCategories);

  return (
    <div>
      <div
        onClick={() => setIsModalOpen(true)}
        className="fixed right-3 bottom-20 z-50 text-2xl bg-white text-black p-2 rounded-full cursor-pointer border border-black md:hidden"
      >
        <IoOptionsOutline />
      </div>
      <MobileModalBox isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="max-h-[500px] overflow-y-auto col-span-1 border rounded-lg flex md:hidden flex-col gap-5 px-[26px] py-[15px] ">
          {/* Price Section */}
          <div className="flex flex-col ">
            <div
              className="flex items-center justify-between border-b-[3px] relative"
              onClick={togglePrice}
            >
              <span className="flex gap-5 items-center">Price </span>
              <div className="absolute h-[3px] bg-black w-10 top-6"></div>
              <span
                className={`cursor-pointer duration-300 ${
                  showPrice ? "transform rotate-180" : ""
                } transition-transform`}
              >
                <FaChevronUp />
              </span>
            </div>
            {showPrice && (
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleSearch={handleSearch}
                query={query}
                params={params}
              />
            )}
          </div>
          {/* Colors Section */}
          <div className="flex flex-col ">
            <div
              className="flex items-center justify-between border-b-[3px] relative"
              onClick={toggleColors}
            >
              <span className="flex gap-5 items-center">Colors </span>
              <div className="absolute h-[3px] bg-black w-14 top-6"></div>
              <span
                className={`cursor-pointer duration-300 ${
                  showColors ? "transform rotate-180" : ""
                } transition-transform`}
              >
                <FaChevronUp />
              </span>
            </div>
            {showColors && (
              <FilterList
                items={colors}
                selectedItem={selectedColor}
                setSelectedItem={setSelectedColor}
                itemType="color"
                handleSearch={handleSearch}
                query={query}
                params={params}
              />
            )}
          </div>
          {/*   <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={toggleBrands}
          >
            <span className="flex gap-5 items-center">Brands </span>
            <div className="absolute h-[3px] bg-black w-14 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showBrands ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showBrands && (
            <FilterList
              items={brands}
              selectedItem={selectedBrand}
              setSelectedItem={setSelectedBrand}
              itemType="brand"
              handleSearch={handleSearch}
              query={query}
              params={params}
            />
          )}
        </div> */}
          <div className="flex flex-col ">
            <div
              className="flex items-center justify-between border-b-[3px] relative"
              onClick={toggleCategories}
            >
              <span className="flex gap-5 items-center">Categories </span>
              <div className="absolute h-[3px] bg-black w-24 top-6"></div>
              <span
                className={`cursor-pointer duration-300 ${
                  showBrands ? "transform rotate-180" : ""
                } transition-transform`}
              >
                <FaChevronUp />
              </span>
            </div>
            {showCategories && (
              <FilterList
                items={allCategories}
                selectedItem={selectedCategory}
                setSelectedItem={setSelectedCategory}
                itemType="category"
                handleSearch={handleSearch}
                query={query}
                params={params}
              />
            )}
          </div>
        </div>
      </MobileModalBox>
      <div className="col-span-1 border rounded-lg hidden md:flex flex-col gap-5 max-h-none px-[26px] py-[15px] ">
        {/* Price Section */}
        <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={togglePrice}
          >
            <span className="flex gap-5 items-center">Price </span>
            <div className="absolute h-[3px] bg-black w-10 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showPrice ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showPrice && (
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleSearch={handleSearch}
              query={query}
              params={params}
            />
          )}
        </div>
        {/* Colors Section */}
        <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={toggleColors}
          >
            <span className="flex gap-5 items-center">Colors </span>
            <div className="absolute h-[3px] bg-black w-14 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showColors ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showColors && (
            <FilterList
              items={colors}
              selectedItem={selectedColor}
              setSelectedItem={setSelectedColor}
              itemType="color"
              handleSearch={handleSearch}
              query={query}
              params={params}
            />
          )}
        </div>
        {/*   <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={toggleBrands}
          >
            <span className="flex gap-5 items-center">Brands </span>
            <div className="absolute h-[3px] bg-black w-14 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showBrands ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showBrands && (
            <FilterList
              items={brands}
              selectedItem={selectedBrand}
              setSelectedItem={setSelectedBrand}
              itemType="brand"
              handleSearch={handleSearch}
              query={query}
              params={params}
            />
          )}
        </div> */}
        <div className="flex flex-col ">
          <div
            className="flex items-center justify-between border-b-[3px] relative"
            onClick={toggleCategories}
          >
            <span className="flex gap-5 items-center">Categories </span>
            <div className="absolute h-[3px] bg-black w-24 top-6"></div>
            <span
              className={`cursor-pointer duration-300 ${
                showBrands ? "transform rotate-180" : ""
              } transition-transform`}
            >
              <FaChevronUp />
            </span>
          </div>
          {showCategories && (
            <FilterList
              items={allCategories}
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
              itemType="category"
              handleSearch={handleSearch}
              query={query}
              params={params}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageFilter;
