"use client";
import useCategory from "@/hooks/useCategory";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Switch } from "@headlessui/react";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import toast from "react-hot-toast";

const Categories = () => {
  const { userInfo } = useContext(StateContext);
  const { getAllCategories, CreateCategory } = useCategory();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState({});

  console.log("selectedCategory", selectedCategory);

  const [discountPercentage, setDiscountPercentage] = useState({
    category: "",
    subCategory: "",
    discount: 0,
  });

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log("response", response);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  console.log("categories", categories);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      const payload = { name: newCategory, storeId: userInfo?.store?._id };
      try {
        const response = await CreateCategory(payload);
        if (response?.success) {
          fetchCategories();
        }
        setNewCategory("");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      toast.error("Please enter a valid category name");
      console.error("Please enter a valid category name");
    }
  };

  // const handleAddSubCategory = async () => {
  //   if (newSubCategory.trim() && selectedCategory !== null) {
  //     try {
  //       const payload = {
  //         name: newSubCategory,
  //         storeId: userInfo?.store?._id,
  //         categoryId: categories[selectedCategory]._id,
  //       };
  //       const response = await CreateSubCategory(payload);
  //       console.log("result of cat", response?.success);
  //       toast.success("Subcategory added successfully");
  //       if (response?.success) {
  //         fetchCategories();
  //       }

  //       setNewSubCategory("");
  //     } catch (error) {
  //       console.error("Error adding subcategory:", error);
  //     }
  //   }
  // };

  useEffect(() => {
    fetchCategories();
  }, []);

  // const handleCategoryChange = async (index, field, value) => {
  //   const updatedCategories = [...categories];
  //   console.log("first", updatedCategories[index][field]);
  //   updatedCategories[index][field] = value;
  //   setCategories(updatedCategories);
  //   const payload = {
  //     [field]: value,
  //   };
  //   const catId = updatedCategories[index]._id;
  //   const response = await UpdateCategory(payload, catId);

  //   console.log("category update", response);
  // };

  /*  const handleSubCategoryChange = async (catIndex, subIndex, field, value) => {
    let updatedCategories = [...categories];

    // Ensure the path exists before assignment
    if (
      updatedCategories[catIndex] &&
      updatedCategories[catIndex].subcategories[subIndex] &&
      updatedCategories[catIndex].subcategories[subIndex].discount
    ) {
      updatedCategories[catIndex].subcategories[subIndex][field] = value;
    }

    setCategories(updatedCategories);

    console.log("first", updatedCategories);

    const payload = {
      [field]: value,
    };
    console.log("payload", payload);
    const subId = updatedCategories[catIndex].subcategories[subIndex]._id;
    const response = await UpdateSubcategory(payload, subId);

    console.log("category update", response);
  };
 */
  console.log("isEditing", isEditing);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleAddCategory}
        >
          Create New Category
        </button>
      </div>
      <div className="mb-4">
        <select
          className="border p-2 mr-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
        >
          <option value={null}>Select Category</option>
          {categories?.map((category, index) => (
            <option key={index} value={index}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="New Subcategory"
          value={newSubCategory}
          onChange={(e) => setNewSubCategory(e.target.value)}
        />
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => {
            if (selectedCategory === null || selectedCategory === undefined) {
              toast.error("Please select a category");
              console.error("Please select a category");
            } else if (!newSubCategory.trim()) {
              toast.error("Please enter a valid subcategory name");
              console.error("Please enter a valid subcategory name");
            } else {
              handleAddSubCategory();
            }
          }}
        >
          Add Subcategory
        </button>
      </div>
      <div>
        {categories?.map((category, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
              <div className="flex bg-gray-200">
                <span
                  onClick={() => {
                    if (category.status !== "active") {
                      handleCategoryChange(index, "status", "active");
                    }
                  }}
                  className={`px-2 py-1 rounded ${
                    category.status === "active"
                      ? "bg-green-200 text-green-800"
                      : "text-gray-600 cursor-pointer"
                  }`}
                >
                  Enable
                </span>
                <span
                  onClick={() => {
                    if (category.status !== "inactive") {
                      handleCategoryChange(index, "status", "inactive");
                    }
                  }}
                  className={`px-2 py-1 rounded ${
                    category.status !== "active"
                      ? "bg-green-200 text-green-800"
                      : "text-gray-600 cursor-pointer"
                  }`}
                >
                  Disable
                </span>
              </div>
            </div>
            <div className="flex justify-start gap-3 items-center mb-4">
              <span className="text-lg">
                Discount:{" "}
                {!(
                  isEditing.category === category?.name &&
                  isEditing.subCategory === undefined
                ) && <span>{category.discount?.percentage}%</span>}
              </span>

              <input
                type="number"
                className={
                  "border p-1 rounded text-sm " +
                  (isEditing.category === category?.name &&
                  isEditing.subCategory === undefined
                    ? "block"
                    : "hidden")
                }
                placeholder={`Discount for ${category?.name}`}
                onChange={(e) => {
                  setDiscountPercentage({
                    category: category?._id,
                    discount: e.target.value,
                  });
                }}
              />
              {isEditing.category === category?.name &&
              isEditing.subCategory === undefined ? (
                <span
                  onClick={() => {
                    setIsEditing({});
                    const percentage =
                      discountPercentage?.category === category?._id
                        ? discountPercentage?.discount
                        : 0;

                    handleCategoryChange(index, "discount", {
                      percentage: percentage,
                      isActive: category.discount?.isActive,
                    });
                  }}
                  className="border rounded p-1 cursor-pointer"
                >
                  <FaCheck />
                </span>
              ) : (
                <span
                  onClick={() => {
                    setIsEditing({
                      category: category?.name,
                    });
                  }}
                  className="border border-black p-0.5 rounded cursor-pointer"
                >
                  <MdEdit />
                </span>
              )}
              <Switch
                checked={category.discount?.isActive}
                onChange={() => {
                  handleCategoryChange(index, "discount", {
                    isActive: !category.discount?.isActive,
                    percentage: category.discount?.percentage,
                  });
                  fetchCategories();
                }}
                className="group inline-flex h-4 w-[30px] items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-600"
              >
                <span className="size-3 translate-x-[2px] rounded-full bg-white transition group-data-[checked]:translate-x-4" />
              </Switch>
            </div>
            <ul className="list-inside">
              {category?.subcategories?.map((subCategory, subIndex) => (
                <li
                  key={subIndex}
                  className="mb-2 p-2 border rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subCategory.name}</span>
                    <div className="flex bg-gray-200">
                      <span
                        onClick={() => {
                          if (subCategory.status !== "active") {
                            handleSubCategoryChange(
                              index,
                              subIndex,
                              "status",
                              "active"
                            );
                          }
                        }}
                        className={`px-2 py-1 rounded ${
                          subCategory.status === "active"
                            ? "bg-green-200 text-green-800"
                            : "text-gray-600 cursor-pointer"
                        }`}
                      >
                        Enable
                      </span>
                      <span
                        onClick={() => {
                          if (subCategory.status !== "inactive") {
                            handleSubCategoryChange(
                              index,
                              subIndex,
                              "status",
                              "inactive"
                            );
                          }
                        }}
                        className={`px-2 py-1 rounded ${
                          subCategory.status !== "active"
                            ? "bg-green-200 text-green-800"
                            : "text-gray-600 cursor-pointer"
                        }`}
                      >
                        Disable
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start gap-3 items-center">
                    <span className="text-lg">
                      Discount:{" "}
                      {!(
                        isEditing.category === category?.name &&
                        isEditing.subCategory === subCategory?.name
                      ) && <span>{subCategory.discount?.percentage}%</span>}
                    </span>
                    <input
                      type="number"
                      className={
                        "border p-1 rounded text-sm " +
                        (isEditing.subCategory === subCategory?.name &&
                        isEditing.category === category?.name
                          ? "block"
                          : "hidden")
                      }
                      placeholder={`Discount for ${subCategory?.name}`}
                      onChange={(e) => {
                        setDiscountPercentage({
                          category: category?._id,
                          subCategory: subCategory?._id,
                          discount: e.target.value,
                        });
                      }}
                    />

                    {isEditing.subCategory === subCategory?.name &&
                    isEditing.category === category?.name ? (
                      <span
                        onClick={(e) => {
                          setIsEditing({});
                          const percentage =
                            discountPercentage?.category === category?._id &&
                            discountPercentage?.subCategory === subCategory?._id
                              ? discountPercentage?.discount
                              : 0;

                          handleSubCategoryChange(index, subIndex, "discount", {
                            percentage: percentage,
                            isActive: subCategory.discount?.isActive,
                          });
                        }}
                        className="border rounded p-1 cursor-pointer"
                      >
                        <FaCheck />
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setIsEditing({
                            subCategory: subCategory?.name,
                            category: category?.name,
                          });
                        }}
                        className="border border-black p-0.5 rounded cursor-pointer"
                      >
                        <MdEdit />
                      </span>
                    )}
                    <Switch
                      checked={subCategory.discount?.isActive}
                      onChange={() => {
                        handleSubCategoryChange(index, subIndex, "discount", {
                          isActive: !subCategory.discount?.isActive,
                          percentage: subCategory.discount?.percentage,
                        });
                        fetchCategories();
                      }}
                      className="group inline-flex h-4 w-[30px] items-center rounded-full bg-gray-200 transition data-[checked]:bg-green-600"
                    >
                      <span className="size-3 translate-x-[2px] rounded-full bg-white transition group-data-[checked]:translate-x-4" />
                    </Switch>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
