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

  const GetAddress = async (addressId) => {
    // Construct the base URL
    let url = `${process.env.VITE_SERVER_URL}/users/getSubAddressList`;

    // Append the addressId as a query parameter if it is available
    if (addressId) {
      url += `?addressId=${addressId}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await response.json();

    return user.data;
  };

  return { CreateUser, updateCustomer, GetAddress };
};

export default useUser;
