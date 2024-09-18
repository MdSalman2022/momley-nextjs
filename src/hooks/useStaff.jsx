const useStaff = () => {
  const getStaffs = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/staff/get-all-staff?storeId=${id}`,
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

  const getStaff = async (id, staffId) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/staff/get-staff?storeId=${id}&id=${staffId}`,
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

  const createStaff = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/staff/create-staff`,
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

  return { getStaffs, getStaff, createStaff };
};

export default useStaff;
