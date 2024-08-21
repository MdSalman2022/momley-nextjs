"use client";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import React, { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableComponent from "@/components/Shared/TableComponent";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import useCategory from "@/hooks/useCategory";
import { useQuery } from "react-query";
import { formatTime } from "@/libs/utils/common";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import toast from "react-hot-toast";
import { set } from "date-fns";

const headers = [
  { label: "", className: "w-[50px]" },
  { label: "Serial", className: "w-[100px]" },
  { label: "Category" },
  { label: "Sub Category", className: "w-[200px]" },
  { label: "Date", className: "w-[200px]" },
  { label: "Action", className: "w-[200px]" },
];
const generateLabelText = (index) => {
  return `${"-".repeat(index)}Sub Category`;
};

const AddSubCategory = ({ params }) => {
  const { userInfo } = useContext(StateContext);
  const storeId = userInfo?.store?._id;
  const level = params.level;
  const {
    getAllCategoriesLevel,
    getAllCategories,
    CreateCategory,
    GetMenus,
    DeleteCategory,
  } = useCategory();

  const [categoryName, setCategoryName] = useState("");
  const [selectedValues, setSelectedValues] = useState(
    Array(level - 1).fill(null)
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([
    { name: "Root", data: [] },
  ]);
  const [selectCategoryErrors, setSelectCategoryErrors] = useState(
    Array(level - 1).fill(false)
  );

  const {
    data: getMenus = {},
    isLoading: isMenuLoading,
    refetch: refetchMenu,
  } = useQuery({
    queryKey: ["getMenus", storeId],
    queryFn: () => storeId && GetMenus(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  console.log("getMenus", getMenus);

  const allMenus =
    !isMenuLoading &&
    getMenus?.data?.map((menu) => {
      return {
        label: menu.name,
        value: menu._id,
        position: menu?.position,
      };
    });

  const [selectedMenuValue, setSelectedMenuValue] = useState("");

  const handleSelectMenuChange = (value) => {
    setSelectedMenuValue(value);
  };

  console.log("allMenusallMenus", allMenus);
  console.log("selectedCategories", selectedCategories);
  console.log("subcategories", subcategories);
  const {
    data: categories = {},
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categories", storeId, level],
    queryFn: () => storeId && getAllCategoriesLevel(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const {
    data: allCategories = {},
    isLoading: isAllCategoryLoading,
    refetch: refetchAllCategory,
  } = useQuery({
    queryKey: ["allCategories", storeId],
    queryFn: () => storeId && getAllCategories(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  useEffect(() => {
    if (allCategories?.data?.length > 0) {
      setSubcategories([
        {
          _id: "root",
          name: selectedCategory || "Root",
          data: allCategories?.data || [],
        },
      ]);
    }
  }, [allCategories]);

  const listOfAllCategories = allCategories?.data || [];

  const handleCellClick = (rowIndex, cellIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${cellIndex}`);
  };

  const handleSelectChange = (value, depth) => {
    try {
      let newSelectedCategories = [...selectedCategories];
      newSelectedCategories[depth] = value;
      setSelectedCategories(newSelectedCategories);

      const selectedCategoryData = subcategories[depth]?.data.find(
        (category) => category._id === value
      );
      const newSubcategories = [...subcategories];
      newSubcategories[depth + 1] = {
        _id: selectedCategoryData?._id || "Unknown",
        name: selectedCategoryData?.name || "Unknown",
        data: selectedCategoryData?.subcategories || [],
      };
      setSubcategories(newSubcategories);
    } catch (error) {
      console.error("Error in handleSelectChange:", error);
    }
  };

  const handleAddSubCategory = async () => {
    let hasError = false;
    const newErrors = selectCategoryErrors.map((error, index) => {
      if (!selectedCategories[index]) {
        hasError = true;
        return true;
      }
      return false;
    });

    if (hasError) {
      toast.error("Please select a category");
      setSelectCategoryErrors(newErrors);
      return;
    }

    if (categoryName.trim() && selectedCategories.length > 0 && level > 0) {
      const payload = {
        name: categoryName,
        storeId: userInfo?.store?._id,
        parentCategory: selectedCategories[selectedCategories.length - 1],
        categoryLevel: categories?.data[level - 1]._id,
        menuId: selectedMenuValue || "",
      };
      try {
        const response = await CreateCategory(payload);
        if (response?.success) {
          window.location.reload();
          toast.success("Sub category added successfully");
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      toast.error("Please enter a valid sub category name");
    }
  };

  const listCategories =
    (categories?.data?.length > 0 && categories?.data[level - 1]) || [];
  const rows = [];

  console.log("listCategories?.categories", listCategories?.categories);

  if (listCategories?.categories) {
    listCategories.categories.forEach((category, index) => {
      const categoryName = category.name;
      const categoryCreatedAt = formatTime(category?.createdAt);
      const parentCategoryName = category.parentCategory?.name || "";

      const handleEditClick = () => {
        // Your edit logic here
        console.log(`Edit category: ${categoryName}`);
      };

      const handleDeleteClick = async () => {
        // Your delete logic here
        console.log(`Delete category: ${category._id}`);
        const response = await DeleteCategory(category._id);
        console.log("response", response);
        if (response?.success) {
          refetchCategory();
          toast.success("Category deleted successfully");
        }
      };

      if (Array.isArray(category.subcategories)) {
        category.subcategories.forEach((sub, subIndex) => {
          rows.push([
            { value: "", className: "" },
            {
              value: `#${index + 1}.${subIndex + 1}`,
              className: "text-[#2F80ED]",
              onClick: handleCellClick,
            },
            { value: categoryName },
            { value: sub.name },
            { value: categoryCreatedAt, className: "" },
            {
              value: (
                <div className="flex gap-2">
                  <button onClick={handleEditClick} className="text-blue-500">
                    Edit
                  </button>
                  <button onClick={handleDeleteClick} className="text-red-500">
                    Delete
                  </button>
                </div>
              ),
              className: "",
            },
          ]);
        });
      } else {
        rows.push([
          { value: "", className: "" },
          {
            value: `#${index + 1}`,
            className: "text-[#2F80ED]",
            onClick: handleCellClick,
          },
          { value: categoryName },
          { value: parentCategoryName, className: "" },
          { value: categoryCreatedAt, className: "" },
          {
            value: (
              <div className="flex gap-2">
                <button onClick={handleEditClick} className="text-blue-500">
                  Edit
                </button>
                <button onClick={handleDeleteClick} className="text-red-500">
                  Delete
                </button>
              </div>
            ),
            className: "",
          },
        ]);
      }
    });
  }

  if (isCategoryLoading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="flex flex-col">
      <TopActionButtons
        title="Add Sub-Category"
        handleFunction={() => handleAddSubCategory()}
        functionTitle="Save Changes"
      />

      <div className="flex flex-col gap-5 px-10 py-5">
        <span className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm">
            Select Menu
          </label>
          <Select onValueChange={handleSelectMenuChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allMenus?.length > 0 &&
                  allMenus?.map((menu) => (
                    <SelectItem key={menu.value} value={menu.value}>
                      {menu.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        <span className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm">
            Select Category
          </label>
          <Select
            onValueChange={(value) => {
              console.log("Selected value:", value);
              handleSelectChange(value, 0);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {listOfAllCategories?.length > 0 &&
                  listOfAllCategories?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </span>
        {subcategories?.slice(1, level - 1).map((categoryData, depth) => (
          <span key={depth + 1} className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              {/* {`Select Subcategory of ${subcategories[depth]?.data?.name}`} */}
              {generateLabelText(level - 2)}
            </label>
            <Select
              onValueChange={(value) => handleSelectChange(value, depth + 1)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryData.data.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </span>
        ))}
        {selectedCategories?.length === level - 1 && (
          <span className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm">
              {generateLabelText(level - 1) + " Name"}
            </label>
            <input
              type="text"
              className="input-box"
              placeholder="Enter Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          {listCategories?.categories?.length > 0 &&
            listCategories?.categories[0]?._id && (
              <p className="font-medium">Sub Category list</p>
            )}
          {listCategories?.categories?.length > 0 &&
            listCategories?.categories[0]?._id && (
              <TableComponent headers={headers} rows={rows} />
            )}
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
