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
    let url = `${process.env.VITE_SERVER_URL}/category/get?storeId=${id}`;

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
  };
};

export default useCategory;
