"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useProfile from "@/hooks/useProfile";
import useStore from "@/hooks/useStore";
import { storeId } from "@/libs/utils/common";
import useCategory from "@/hooks/useCategory";
import useCart from "@/hooks/useCart";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const { getProfile } = useProfile();
  const { getStore } = useStore();
  const { getAllCategoriesLevel } = useCategory();
  const { getCart } = useCart();

  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filterBooks, setFilterBooks] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [writerName, setWriterName] = useState("");

  const uid = user?.uid;

  const {
    data: storeInfo = {},
    isLoading: isStoreInfoLoading,
    refetch: refetchStoreInfo,
  } = useQuery({
    queryKey: ["storeInfo", storeId],
    queryFn: () => storeId && getStore(storeId),
    cacheTime: 10 * (60 * 1000), // cache data for 10 minutes
    staleTime: 5 * (60 * 1000), // consider data fresh for 5 minutes
  });

  const {
    data: categoriesLevel = {},
    isLoading: isCategoriesLevelLoading,
    refetch: refetchCategoriesLevel,
  } = useQuery({
    queryKey: ["categoriesLevel", storeId],
    queryFn: () => storeId && getAllCategoriesLevel(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    enabled: !!storeId, // Ensure the query only runs if storeId is available
  });

  const totalLevel = categoriesLevel?.data?.length;

  console.log("storeInfo", storeInfo);

  const {
    data: userInfo = {},
    isLoading: isUserInfoLoading,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ["userInfo", user, uid],
    queryFn: () => uid && getProfile(uid),
    cacheTime: 2 * (60 * 1000), // cache data for 10 minutes
    staleTime: 1 * (60 * 1000), // consider data fresh for 5 minutes
    enabled: !!uid,
  });

  console.log("userInfo", userInfo);

  const {
    data: cartInfo = {},
    isLoading: isCartInfoLoading,
    refetch: refetchCartInfo,
  } = useQuery({
    queryKey: ["cartInfo", storeId, userInfo?._id],
    queryFn: () => {
      if (storeId && userInfo?._id) {
        return getCart(storeId, userInfo?._id);
      }
      return Promise.resolve({}); // Return a default value if conditions are not met
    },
    cacheTime: 10 * (60 * 1000), // cache data for 10 minutes
    staleTime: 5 * (60 * 1000), // consider data fresh for 5 minutes
    enabled: !!storeId && !!userInfo?._id, // Only enable the query if conditions are met
  });

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
        `${process.env.VITE_SERVER_URL}/products/get-all?storeId=${storeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        return [];
        // throw new Error("Network response was not ok");
      }
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        return await result.data;
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

  const stateInfo = {
    storeInfo,
    isStoreInfoLoading,
    refetchStoreInfo,
    storeId,
    userInfo,
    isUserInfoLoading,
    refetchUserInfo,
    allBooks,
    isLoading,
    error,
    refetch,
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
    categoriesLevel,
    totalLevel,
    cartInfo,
    isCartInfoLoading,
    refetchCartInfo,
  };

  return (
    <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
