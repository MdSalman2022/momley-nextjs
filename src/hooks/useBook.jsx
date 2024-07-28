const useBook = () => {
  const getBookDetails = async (bookId) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/${bookId}`,
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
      const bookDetails = await response.json();
      return bookDetails;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error; // Or handle the error as appropriate for your application
    }
  };

  const getAllBookDetails = async (page, pageSize) => {
    try {
      // const response = await fetch(
      //   `${process.env.VITE_SERVER_URL}/api/get/booklist?page=${page}&pageSize=${pageSize}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      return [];
      if (!response.ok) {
        return [];
        // throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ProductList = await response.json();
      return ProductList;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      // or
      throw error;
    }
  };

  const getAllAuthors = async () => {
    // const response = await fetch(
    //   `${process.env.VITE_SERVER_URL}/api/get/authors`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    return [];

    // Check if the response was successful
    if (!response.ok) {
      return [];
      // throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Ensure the response is in JSON format
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response from server");
    }

    const authors = await response.json();
    return authors;
  };

  const getAllCategories = async () => {
    try {
      // const response = await fetch(
      //   `${process.env.VITE_SERVER_URL}/users/categories`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      return [];
      if (!response.ok) {
        return [];
        // throw new Error(`Error: ${response.status}`);
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  };
  return { getBookDetails, getAllBookDetails, getAllAuthors, getAllCategories };
};

export default useBook;
