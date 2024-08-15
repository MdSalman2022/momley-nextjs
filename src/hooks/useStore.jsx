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

  return { getStore };
};

export default useStore;
