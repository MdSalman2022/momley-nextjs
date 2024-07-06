import useBook from "@/app/hooks/useBook";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import productImage from "../../../../../public/images/products/product.png";
import brandImage1 from "../../../../../public/images/brands/1.png";
import brandImage2 from "../../../../../public/images/brands/2.png";
import brandImage3 from "../../../../../public/images/brands/3.png";
import brandImage4 from "../../../../../public/images/brands/4.png";
import brandImage5 from "../../../../../public/images/brands/5.png";
import brandImage6 from "../../../../../public/images/brands/6.png";
import brandImage7 from "../../../../../public/images/brands/7.png";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

const Categories = async () => {
  const { getAllAuthors, getAllCategories } = useBook();

  const authors = await getAllAuthors();
  const categories = await getAllCategories();

  console.log("authors", authors);
  console.log("categories", categories);

  const brandImages = [
    brandImage1,
    brandImage2,
    brandImage3,
    brandImage4,
    brandImage5,
    brandImage6,
    brandImage7,
  ];

  return (
    <div className="space-y-5 text-black">
      <p className="font-semibold text-xl">Shop by Category</p>
      <Suspense
        fallback={
          <div className="grid grid-cols-4 gap-5">
            {Array(4)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="h-10 flex justify-center bg-gray-300 animate-pulse rounded"
                >
                  <div className="animate-pulse bg-gray-500 h-8 rounded"></div>
                </div>
              ))}
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            {categories.map((category, index) => (
              <Link
                href={`/category/${category}`}
                key={index}
                className="flex justify-between items-center gap-10 h-24 w-60 p-5 hover:bg-gray-100"
              >
                <Image
                  src={productImage}
                  alt={"product"}
                  className="w-16 h-16"
                />
                {truncateText(category, 18)}
              </Link>
            ))}
            {categories.map((category, index) => (
              <Link
                href={`/category/${category}`}
                key={index}
                className="flex justify-between items-center gap-10 h-24 w-60 p-5 hover:bg-gray-100"
              >
                <Image
                  src={productImage}
                  alt={"product"}
                  className="w-16 h-16"
                />
                {truncateText(category, 18)}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            {categories.map((category, index) => (
              <Link
                href={`/category/${category}`}
                key={index}
                className="flex justify-between items-center gap-10 h-24 w-60 p-5 hover:bg-gray-100"
              >
                <Image
                  src={productImage}
                  alt={"product"}
                  className="w-16 h-16"
                />
                {truncateText(category, 18)}
              </Link>
            ))}
            {categories.map((category, index) => (
              <Link
                href={`/category/${category}`}
                key={index}
                className="flex justify-between items-center gap-10 h-24 w-60 p-5 hover:bg-gray-100"
              >
                <Image
                  src={productImage}
                  alt={"product"}
                  className="w-16 h-16"
                />
                {truncateText(category, 18)}
              </Link>
            ))}
          </div>
        </div>
      </Suspense>

      <p className="font-semibold text-xl">Shop by Brands</p>
      <Suspense
        fallback={
          <div className="grid grid-cols-5 gap-5">
            {Array(5)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="h-10 flex justify-center bg-gray-300 animate-pulse rounded"
                >
                  <div className="animate-pulse bg-gray-500 h-8 rounded"></div>
                </div>
              ))}
          </div>
        }
      >
        <div className="flex items-center gap-10">
          {/* {authors.map((writer, index) => (
            <div
              key={index}
              className="flex primary-outline-btn justify-center"
            >
              {writer}
            </div>
          ))} */}
          {brandImages.map((brandImage, index) => (
            <div key={index} className="flex justify-center">
              <Image src={brandImage} alt="brand" />
            </div>
          ))}
          <div className="border border-[#1111110d] w-40 h-40 flex items-center justify-center">
            <span className="bg-black rounded-lg text-white font-bold h-8 w-[105px] flex items-center justify-center cursor-pointer">
              View All
            </span>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Categories;
