import { storeId } from "@/libs/utils/common";
import { getCookie, setCookie } from "@/libs/utils/cookieUtils";
import toast from "react-hot-toast";

const useCart = () => {
  const handleAddToCart = async (
    newProduct,
    userInfo,
    setProductCartCount,
    refetchCartInfo
  ) => {
    console.log("check stock", newProduct?.stock?.quantity);

    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: newProduct._id,
      quantity: 1,
    };

    // Check if the user is logged in
    if (userInfo?._id) {
      // User is logged in, send request to the server
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCartInfo();
        setProductCartCount(1);
        toast.success("Product added to cart!");
      }
    } else {
      const cartKey = "userCart"; // Define a key for the cart in cookies

      // Get existing cart from cookies or create a new one
      const existingCart = JSON.parse(getCookie(cartKey) || "[]");

      // Update cart with the new product
      const updatedCart = existingCart.map((product) =>
        product._id === newProduct._id
          ? { productId: newProduct?._id, quantity: product.quantity + 1 } // Update quantity if exists
          : product
      );

      // If product doesn't exist in the cart, add it
      if (!existingCart.some((product) => product._id === newProduct._id)) {
        updatedCart.push({
          productId: newProduct?._id,
          storeId: storeId,
          quantity: 1,
        });
      }
      console.log("updatedCart", updatedCart);

      // Store updated cart back to cookies
      setCookie(cartKey, JSON.stringify(updatedCart), 7); // Store for 7 days

      // Update product cart count in state

      setProductCartCount(1);
      refetchCartInfo();
      toast.success("Product added to cart!");

      // Check if the user is logged in
    }
  };

  const handlePlusClick = async (
    newProduct,
    userInfo,
    cartInfo,
    productCartCount,
    setProductCartCount,
    refetchCartInfo
  ) => {
    if (
      cartInfo?.find((product) => product._id === newProduct._id)?.quantity >=
      newProduct?.stock?.quantity
    ) {
      toast.error("Product out of stock");
      return;
    }
    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: newProduct._id,
      quantity: productCartCount + 1,
    };

    if (userInfo?._id) {
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCartInfo();
        setProductCartCount((prevCount) => prevCount + 1);
      }
    } else if (productCartCount < newProduct?.stock?.quantity) {
      const cartKey = "userCart";

      const existingCart = JSON.parse(getCookie(cartKey) || "[]");
      console.log("existingCart", existingCart);
      const updatedCart = existingCart.map((product) =>
        product.productId === newProduct._id
          ? {
              productId: newProduct._id,
              quantity: product.quantity + 1,
              storeId: storeId,
            }
          : product
      );

      setCookie(cartKey, JSON.stringify(updatedCart), 7);

      setProductCartCount((prevCount) => prevCount + 1);
    }
  };

  const handleMinusClick = async (
    newProduct,
    userInfo,
    cartInfo,
    productCartCount,
    setProductCartCount,
    refetchCartInfo
  ) => {
    if (productCartCount <= 1) {
      return;
    }

    const payload = {
      userId: userInfo?._id,
      storeId: storeId,
      productId: newProduct._id,
      quantity: productCartCount - 1,
    };

    if (userInfo?._id) {
      const response = await AddToCart(payload);

      if (response?.success) {
        refetchCartInfo();
        setProductCartCount((prevCount) => prevCount - 1);
      }
    } else if (productCartCount > 1) {
      const cartKey = "userCart";

      const existingCart = JSON.parse(getCookie(cartKey) || "[]");
      console.log("existingCart", existingCart);

      const updatedCart = existingCart.map((product) =>
        product.productId === newProduct._id
          ? {
              productId: newProduct._id,
              quantity: product.quantity - 1,
              storeId: storeId,
            }
          : product
      );

      setCookie(cartKey, JSON.stringify(updatedCart), 7);

      setProductCartCount((prevCount) => prevCount - 1);
    }
  };

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

  return {
    getAbandonedCart,
    getCart,
    getCartCheckout,
    AddToCart,
    EmptyCart,
    handleAddToCart,
    handlePlusClick,
    handleMinusClick,
  };
};

export default useCart;
