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
    const booksList = await response.json();
    return booksList;
  };

  return { getBooksByCategory };
};

export default useCategory;
