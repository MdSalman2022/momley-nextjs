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

const BooksInHome = async () => {
  const { getAllBookDetails } = useBook();
  const allBooks = await getAllBookDetails(1, 20);
  console.log("allBooks", allBooks);

  const { GetProduct } = useProduct();

  const allProducts = await GetProduct();

  console.log("allProducts", allProducts);

  const Sections = [
    {
      title: "New Arrival",
      items: allProducts?.data?.length > 0 && allProducts?.data?.slice(0, 20),
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
    {
      title: "Mom & Baby",
      items: allBooks?.books?.length > 0 && allBooks.books.slice(0, 20),
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
    },
    {
      title: "All Products",
      items: allBooks?.books?.length > 0 && allBooks.books.slice(0, 20),
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

  const SectionOneAds = [
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
  ];

  const SectionOneBottomAds = [
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
  ];

  const SectionTwoAds = [
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
  ];

  const SectionThreeAds = [
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
  ];

  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      {Sections.map((section, index) => {
        return (
          <ReusableItemsSection
            title={section.title}
            items={section.items}
            ads={section.ads}
            bottomAds={section.bottomAds}
          />
        );
      })}
    </div>
  );
};

export default BooksInHome;
