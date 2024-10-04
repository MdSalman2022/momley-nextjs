const useCart = () => {
  const getAbandonedCart = async (storeId) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/cart/get-abandoned-cart?storeId=${storeId}`,
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

  const getCart = async (id, userId) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/cart/get?storeId=${id}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const profile = await response.json();

    return profile?.data || [];
  };
  const getCartCheckout = async (
    storeId,
    userId,
    deliveryLocation,
    discountCode,
    products
  ) => {
    let url = `${
      process.env.VITE_SERVER_URL
    }/cart/get-checkout?storeId=${encodeURIComponent(
      storeId
    )}&deliveryLocation=${encodeURIComponent(deliveryLocation)}`;

    if (userId) {
      url += `&userId=${encodeURIComponent(userId)}`;
    }
    if (discountCode) {
      url += `&discountCode=${encodeURIComponent(discountCode)}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    });

    const profile = await response.json();
    return profile?.data;
  };

  const AddToCart = async (payload) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/cart/add-to-cart`,
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
  const EmptyCart = async (id) => {
    const response = await fetch(
      `${process.env.VITE_SERVER_URL}/cart/empty?userId=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
    const data = await response.json();

    return data;
  };

  return { getAbandonedCart, getCart, getCartCheckout, AddToCart, EmptyCart };
};

export default useCart;
