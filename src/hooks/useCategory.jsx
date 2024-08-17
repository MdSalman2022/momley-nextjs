import { storeId } from "@/libs/utils/common";
import React from "react";

const useCategory = () => {
  const getBooksByCategory = async (name) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/api/get/books/bycategory?category=${name}&&page=1&&pageSize=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const ProductList = await response.json();
    return ProductList;
  };
  const getAllCategoriesLevel = async (id, level) => {
    let url = `${process.env.VITE_SERVER_URL}/category/get-level`;

    const queryParams = [];
    if (id) {
      console.log(`Adding storeId: ${id}`); // Debug log
      queryParams.push(`storeId=${id}`);
    }
    if (level) {
      console.log(`Adding level: ${level}`); // Debug log
      queryParams.push(`level=${level}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    console.log(`Final URL: ${url}`); // Debug log

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const CategoryList = await response.json();
    return CategoryList;
  };
  const getAllCategories = async (id, level) => {
    let url = `${
      process.env.VITE_SERVER_URL
    }/category/get?storeId=${id}&depth=${level || 3}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const CategoryList = await response.json();
    return CategoryList;
  };

  const getCategoryBySlug = async (id, level, slug) => {
    let url = `${
      process.env.VITE_SERVER_URL
    }/category/get-category-by-slug?storeId=${id}&depth=${level || 3}&slug=${
      slug || ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const CategoryList = await response.json();
    return CategoryList;
  };

  const getProductsByCategory = async (id, categoryName) => {
    let url = `${process.env.VITE_SERVER_URL}/category/get-products-by-category?storeId=${id}&slug=${categoryName}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const CategoryList = await response.json();
    return CategoryList;
  };

  const CreateCategoryLevel = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/create-level`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const CategoryData = await response.json();
    return CategoryData;
  };

  const CreateCategory = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const CategoryData = await response.json();
    return CategoryData;
  };

  const CreateMenu = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/create-menu`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const CategoryData = await response.json();
    return CategoryData;
  };
  const AddCategoryToMenu = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/add-category-to-menu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const CategoryData = await response.json();
    return CategoryData;
  };

  const GetMenus = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/get-menu?storeId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const CategoryData = await response.json();
    return CategoryData;
  };
  const GetMenuByPosition = async (id, position, level) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/get-menu-by-position?storeId=${id}&position=${position}&depth=${level}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const CategoryData = await response.json();
    return CategoryData;
  };

  const UpdateCategory = async (payload, id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const DATA = await response.json();
    return DATA;
  };
  const UpdateSubcategory = async (payload, id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/category/update-sub/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const SubData = await response.json();
    return SubData;
  };

  const getAllMenus = async (id, level) => {
    let url = `${process.env.VITE_SERVER_URL}/category/get-menu?storeId=${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const CategoryList = await response.json();
    return CategoryList;
  };
  const getMenuById = async (storeId, depth, id) => {
    let url = `${process.env.VITE_SERVER_URL}/category/get-menu-by-id?storeId=${storeId}&depth=${depth}&id=${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const CategoryList = await response.json();
    return CategoryList;
  };

  const GetProductsByFeaturedCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/category/get-product-by-featured-category?storeId=${storeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        return [];
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return product?.data;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      return [];
    }
  };

  return {
    getBooksByCategory,
    getAllCategories,
    CreateCategory,
    UpdateCategory,
    UpdateSubcategory,
    getAllCategoriesLevel,
    CreateCategoryLevel,
    CreateMenu,
    GetMenus,
    getAllMenus,
    getMenuById,
    AddCategoryToMenu,
    GetProductsByFeaturedCategory,
    GetMenuByPosition,
    getProductsByCategory,
    getCategoryBySlug,
  };
};

export default useCategory;
