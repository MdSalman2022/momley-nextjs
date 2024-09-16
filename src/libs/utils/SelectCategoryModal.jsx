"use client";
import HeadlessModalBox from "@/components/Shared/HeadlessModalBox";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useCategory from "@/hooks/useCategory";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SelectCategoryModal = ({ isOpen, setIsOpen, setSelectedSubCategory }) => {
  const { userInfo } = useContext(StateContext);
  const storeId = userInfo?.store?._id;

  const { getAllCategories, getAllCategoriesLevel } = useCategory();

  const {
    data: categoriesLevel = {},
    isLoading: isCategoryLevelLoading,
    refetch: refetchCategoryLevel,
  } = useQuery({
    queryKey: ["categoriesLevel", storeId],
    queryFn: () => storeId && getAllCategoriesLevel(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const totalLevel = categoriesLevel?.data?.length || 1;

  const {
    data: allCategories = {},
    isLoading: isCategoryLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["allCategories", storeId, totalLevel],
    queryFn: () => storeId && getAllCategories(storeId, totalLevel),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const [selectedCategories, setSelectedCategories] = useState(
    Array(totalLevel).fill({ _id: null })
  );
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [finalSelectedCategory, setFinalSelectedCategory] = useState({
    id: null,
    name: null,
    ancestors: [],
  });
  const [previousCategories, setPreviousCategories] = useState(
    Array(totalLevel).fill({ _id: null })
  );

  console.log("selectedCategories", selectedCategories);
  console.log("currentLevel", currentLevel);
  console.log("currentCategories", currentCategories);
  console.log("finalSelectedCategory", finalSelectedCategory);
  console.log("previousCategories", previousCategories);

  const handleCategoryChange = (level, categoryId, subcategories) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[level] = { _id: categoryId };
      return newSelected;
    });

    if (subcategories && subcategories.length > 0) {
      setPreviousCategories((prevPrevious) => {
        const newPrevious = [...prevPrevious];
        newPrevious[level] = currentCategories;
        return newPrevious;
      });
      setCurrentLevel(level + 1);
      setCurrentCategories(subcategories);
    }
  };

  const handleBack = () => {
    setCurrentLevel((prevLevel) => {
      const newLevel = Math.max(prevLevel - 1, 0);
      const previousCategoryId = selectedCategories[newLevel]?._id;
      const previousCategory = allCategories.data.find(
        (category) => category._id === previousCategoryId
      );

      if (previousCategory && previousCategory.subcategories) {
        setCurrentCategories(previousCategory.subcategories);
      } else {
        setCurrentCategories(
          previousCategories[newLevel] || allCategories.data?.subcategories
        );
      }

      return newLevel;
    });

    setSelectedCategories((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[currentLevel - 1] = { _id: null };
      return newSelected;
    });

    setFinalSelectedCategory(null);
  };

  const renderCategories = (categories, level = 0) => {
    return categories.map((category) => (
      <div key={category._id} className="flex flex-col gap-5 w-full">
        <div
          onClick={() => {
            if (category?.subcategories?.length > 0) {
              handleCategoryChange(level, category._id, category.subcategories);
            } else {
              setFinalSelectedCategory({
                id: category._id,
                name: category.name,
                ancestors: category?.ancestors,
              });
            }
          }}
          className={`flex items-center justify-between gap-2 cursor-pointer w-full h-12 px-2 rounded-lg ${
            selectedCategories[level]?._id === category._id ||
            finalSelectedCategory?.id === category._id
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          <span>{category.name}</span>
          {category?.subcategories?.length > 0 && <FaChevronRight />}
        </div>
      </div>
    ));
  };

  return (
    <div>
      <HeadlessModalBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Select Category"
      >
        <div className="flex flex-col h-full gap-1 px-6 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 h-full">
              {allCategories?.data && renderCategories(allCategories.data)}
            </div>
            <div className="flex flex-col gap-1">
              {currentLevel > 0 && (
                <button
                  className="flex items-center gap-2 mb-2"
                  onClick={handleBack}
                >
                  <FaChevronLeft />
                  <span>Back</span>
                </button>
              )}
              {currentLevel > 0 &&
                renderCategories(currentCategories, currentLevel)}
            </div>
          </div>
          <button
            className="mt-4 primary-btn justify-center text-white px-4 py-2 rounded"
            onClick={() => {
              if (finalSelectedCategory) {
                setSelectedSubCategory(finalSelectedCategory);
              }
              setIsOpen(false);
            }}
          >
            Submit
          </button>
        </div>
      </HeadlessModalBox>
    </div>
  );
};

export default SelectCategoryModal;
