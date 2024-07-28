const useProduct = () => {
  const createProduct = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error;
    }
  };

  const GetProduct = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/list`,
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
      return product;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      return [];
      // throw error;
    }
  };

  const SearchProduct = async (name, storeId) => {
    try {
      const response = await fetch(
        `${
          process.env.VITE_SERVER_URL
        }/products/search?name=${name}&storeId=${"66965d022e79323150e122df"}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error;
    }
  };

  return { createProduct, GetProduct, SearchProduct };
};

export default useProduct;
