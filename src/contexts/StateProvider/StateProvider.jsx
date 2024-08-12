"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useProfile from "@/hooks/useProfile";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const { getProfile } = useProfile();
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filterBooks, setFilterBooks] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [writerName, setWriterName] = useState("");

  const uid = user?.uid;

  console.log("user", user);
  console.log("uid", uid);

  const {
    data: userInfo = {},
    isLoading: isUserInfoLoading,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ["userInfo", user, uid],
    queryFn: () => uid && getProfile(uid),
    cacheTime: 2 * (60 * 1000), // cache data for 10 minutes
    staleTime: 1 * (60 * 1000), // consider data fresh for 5 minutes
  });

  console.log("userInfo", userInfo);

  // console.log(page);
  // console.log(pageSize);
  const {
    data: { books: allBooks = [] } = {},
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["allBooks", page, pageSize],
    async () => {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/products/list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return [];
        // throw new Error("Network response was not ok");
      }
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        return await data;
      } else {
        throw new Error("Expected JSON response");
      }
    },
    {
      onSuccess: (data) => {
        // console.log(data);
        const totalCount = data.totalDataLength; // Assuming the API response provides the total count of books
        const calculatedTotalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(calculatedTotalPages);
      },
    }
  );
  // console.log("allBooks", allBooks);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart.length]);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (
      cartFromLocalStorage &&
      JSON.stringify(cartFromLocalStorage) !== JSON.stringify(cart)
    ) {
      setCart(cartFromLocalStorage);
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart.length]);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (
      cartFromLocalStorage &&
      JSON.stringify(cartFromLocalStorage) !== JSON.stringify(cart)
    ) {
      setCart(cartFromLocalStorage);
    }
  }, [cart]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  // Save the cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const stateInfo = {
    userInfo,
    refetchUserInfo,
    allBooks,
    isLoading,
    error,
    refetch,
    cart,
    setCart,
    setPageSize,
    setPage,
    page,
    pageSize,
    totalPages,
    setTotalPages,
    filterBooks,
    setFilterBooks,
    writerName,
    setWriterName,
  };

  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
