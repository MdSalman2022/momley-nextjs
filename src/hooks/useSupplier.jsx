const useSupplier = () => {
  const getSuppliers = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/suppliers/get-suppliers?storeId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profile = await response.json();

    return profile;
  };

  const createSupplier = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/suppliers/create-supplier`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    return data;
  };
  const updateSupplier = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/suppliers//update-supplier`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();

    return data;
  };

  return { getSuppliers, createSupplier, updateSupplier };
};

export default useSupplier;
