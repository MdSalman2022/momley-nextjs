const useDiscount = () => {
  const getDiscountByStore = async (storeId) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/discount/get-discounts-by-store?storeId=${storeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const discount = await response.json();
    return discount?.data;
  };

  const getDiscountByCode = async (storeId, discountCode) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/discount/get-discount-by-code?storeId=${storeId}&discountCode=${discountCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const discount = await response.json();
    return discount?.data;
  };

  const createDiscount = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/discount/create-discount`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const profile = await response.json();

    return profile?.data;
  };

  const updateDiscount = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/discount/update-discount`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const profile = await response.json();

    return profile?.data;
  };

  return {
    createDiscount,
    getDiscountByStore,
    getDiscountByCode,
    updateDiscount,
  };
};

export default useDiscount;
