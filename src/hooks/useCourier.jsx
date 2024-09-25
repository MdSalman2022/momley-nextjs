const useCourier = () => {
  const getCouriers = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/courier/get-couriers?storeId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profile = await response.json();

    return profile?.data;
  };

  const createCourier = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/courier/create-courier`,
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

  const updateCourier = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/courier/edit-courier-info`,
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

  return { getCouriers, createCourier, updateCourier };
};

export default useCourier;
