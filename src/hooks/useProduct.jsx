import { storeId } from "@/libs/utils/common";

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

  const updateProduct = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/update`,
        {
          method: "PUT",
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
  const GetProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/get-all?storeId=${storeId}`,
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
      // throw error;
    }
  };

  const GetNewArrivalProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/get-new-arrival?storeId=${storeId}`,
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
      // throw error;
    }
  };

  const GetProductsById = async (slug) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/get?slug=${slug}`,
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

  const SearchProduct = async (name, filter) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ storeId, name, filter }),
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

  const GetFilterMetrics = async (level) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/get-filter-metrics?storeId=${storeId}&level=${level}`,
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

  return {
    createProduct,
    updateProduct,
    GetProducts,
    SearchProduct,
    GetProductsById,
    GetNewArrivalProducts,
    GetFilterMetrics,
  };
};

export default useProduct;
