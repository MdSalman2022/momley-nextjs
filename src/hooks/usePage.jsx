const usePage = () => {
  const getPages = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/page/get-pages-by-user`,
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

  return { getPages };
};

export default usePage;
