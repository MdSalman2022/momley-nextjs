const useUser = () => {
  const CreateUser = async (data) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/users/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const user = await response.json();

    return user;
  };

  const updateCustomer = async (data) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/users/update-customer`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const user = await response.json();

    return user;
  };

  return { CreateUser, updateCustomer };
};

export default useUser;
