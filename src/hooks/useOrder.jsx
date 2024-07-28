const useOrder = () => {
  const createOrder = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/orders/create`,
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

  const getOrders = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/orders/list`,
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

  return { createOrder, getOrders };
};

export default useOrder;
