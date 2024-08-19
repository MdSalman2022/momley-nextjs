const useProfile = () => {
  const getProfile = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/users/get-user?id=${id}`,
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

  const updateProfile = async (data) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/profile/updateProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const profile = await response.json();

    return profile;
  };

  return { getProfile, updateProfile };
};

export default useProfile;
