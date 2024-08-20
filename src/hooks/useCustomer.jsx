import { storeId } from "@/libs/utils/common";

const useCustomer = () => {
  const GetCustomers = async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/customer/get-customer?storeId=${storeId}`,
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

  const SearchCustomer = async (name, storeId) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/customer/search?name=${name}&storeId=${storeId}`,
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
      const customer = await response.json();
      return customer;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error;
    }
  };
  const CreateCustomer = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/customer/create`,
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

  const UpdateCustomer = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/customer/update`,
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

  return { GetCustomers, SearchCustomer, CreateCustomer, UpdateCustomer };
};

export default useCustomer;
