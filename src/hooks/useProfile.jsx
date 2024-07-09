const useProfile = () => {
  const updateProfile = async (data) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/api/profile/updateProfile`,
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

  return { updateProfile };
};

export default useProfile;
