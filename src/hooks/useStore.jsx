const useStore = () => {
  const getStore = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/store/get-store?storeId=${id}`,
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

  const createStaff = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/store/create-staff`,
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

  return { getStore, createStaff };
};

export default useStore;
