import React, { lazy, Suspense } from "react";
import Link from "next/link";
import useBook from "@/hooks/useBook";
import { GrSearch } from "react-icons/gr";
import ReusableItemsSection from "../ReusableItemsSection/ReusableItemsSection";
const ProductCard = lazy(() => import("@/components/Shared/ProductCard"));
import NewLatestCollectionMen from "../../../../../public/images/ads/NewLatestCollectionMen.png";
import TrendingWomenCollection from "../../../../../public/images/ads/TrendingWomenCollection.png";
import WatchCollection from "../../../../../public/images/ads/WatchCollection.png";
import CosmeticsCollection from "../../../../../public/images/ads/CosmeticsCollection.png";
import BabyProducts from "../../../../../public/images/ads/BabyProducts.png";
import NewLatestCollection from "../../../../../public/images/ads/NewLatestCollection.png";
import TrendingManCollection from "../../../../../public/images/ads/TrendingManCollection.png";
import useProduct from "@/hooks/useProduct";
import useCategory from "@/hooks/useCategory";

const BooksInHome = async () => {
  const { getAllBookDetails } = useBook();
  const allBooks = await getAllBookDetails(1, 20);
  console.log("allBooks", allBooks);

  const { GetProducts, GetNewArrivalProducts } = useProduct();
  const { GetProductsByFeaturedCategory } = useCategory();

  const allProducts = await GetProducts();
  const newArrivalProducts = await GetNewArrivalProducts();
  const featuredCategoryProducts = await GetProductsByFeaturedCategory();

  console.log("allProducts", allProducts);
  console.log("featuredCategoryProducts", featuredCategoryProducts);

  const sections = [
    {
      title: "New Arrival",
      items:
        newArrivalProducts?.products?.length > 0 &&
        newArrivalProducts?.products?.slice(0, 10),
      ads: [
        {
          image: NewLatestCollectionMen,
          firstLine: "New  arrivals",
          secondLine: "New Latest Collection",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#333333",
        },
        {
          image: TrendingWomenCollection,
          firstLine: "New  arrivals",
          secondLine: "New Latest Collection",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#ffffff",
        },
      ],
      bottomAds: [
        {
          image: WatchCollection,
          firstLine: "New  arrivals",
          secondLine: "WATCH collection",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#333333",
        },
        {
          image: CosmeticsCollection,
          firstLine: "New  arrivals",
          secondLine: "COSMETICS COLLECTION ",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#333333",
        },
        {
          image: BabyProducts,
          firstLine: "New  arrivals",
          secondLine: "BABY PRODUCTS ",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#333333",
        },
      ],
    },
    ...featuredCategoryProducts?.map((category) => {
      return {
        title: category?.name,
        items: category?.products?.slice(0, 10),
        ads: [
          {
            image: NewLatestCollection,
            firstLine: "New  arrivals",
            secondLine: "NEW LATEST COLLECTION",
            thirdLine: "All Special Products, Up To 45% Off",
            TextColor: "#333333",
          },
          {
            image: TrendingManCollection,
            firstLine: "New  arrivals",
            secondLine: "TENDING MAN’S COLLECTION",
            thirdLine: "All Special Products, Up To 45% Off",
            TextColor: "#ffffff",
          },
        ],
      };
    }),
    {
      title: "All Products",
      items:
        allProducts?.products?.length > 0 &&
        allProducts?.products?.slice(0, 20),
      ads: [
        {
          image: NewLatestCollectionMen,
          firstLine: "New  arrivals",
          secondLine: "NEW LATEST COLLECTION",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#333333",
        },
        {
          image: TrendingWomenCollection,
          firstLine: "New  arrivals",
          secondLine: "TENDING WOMAN’S COLLECTION",
          thirdLine: "All Special Products, Up To 45% Off",
          TextColor: "#ffffff",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 md:items-start">
      {sections.map((section, index) => (
        <ReusableItemsSection
          key={index}
          title={section.title}
          items={section.items}
          ads={section.ads}
          bottomAds={section.bottomAds}
        />
      ))}
    </div>
  );
};

export default BooksInHome;
