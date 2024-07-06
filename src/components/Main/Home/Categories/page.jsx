import useBook from "@/app/hooks/useBook";
import Link from "next/link";
import { Suspense } from "react";

const Categories = async () => {
  const { getAllAuthors, getAllCategories } = useBook();

  const authors = await getAllAuthors();
  const categories = await getAllCategories();

  console.log("authors", authors);
  console.log("categories", categories);

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
        <div className="grid grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <Link
              href={`/category/${category}`}
              key={index}
              className="flex primary-outline-btn justify-center"
            >
              {category}
            </Link>
          ))}
        </div>
      </Suspense>

      <p className="font-semibold text-xl">Shop by writer</p>
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
        <div className="grid grid-cols-5 gap-5">
          {authors.map((writer, index) => (
            <div
              key={index}
              className="flex primary-outline-btn justify-center"
            >
              {writer}
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Categories;
