const useBook = () => {
  const getBookDetails = async (bookId) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/api/get/book/${bookId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const bookDetails = await response.json();

    return bookDetails;
  };

  const getAllBookDetails = async (page, pageSize) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/api/get/booklist?page=${page}&pageSize=${pageSize}`,
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

  const getAllAuthors = async () => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/api/get/authors`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
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
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/api/get/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const categories = await response.json();

    return categories;
  };
  return { getBookDetails, getAllBookDetails, getAllAuthors, getAllCategories };
};

export default useBook;
