import React from "react";
import Banner from "@/components/Main/Home/Banner/page";
import ProductCard from "@/components/Shared/ProductCard";
import useCategory from "@/hooks/useCategory";
import CategoryPagination from "./CategoryPagination";
import ResetButton from "./ResetButton";
import ProductList from "./ProductList";
import CategoryPageTitle from "./CategoryPageTitle";
import useBook from "@/hooks/useBook";
import CategoryPageFilter from "./CategoryPageFilter";
import { storeId, totalLevel } from "@/libs/utils/common";
import useProduct from "@/hooks/useProduct";

const Category = async ({ params }) => {
  const { getProductsByCategory, getCategoryBySlug, getAllCategoriesLevel } =
    useCategory();
  const { GetProducts, GetFilterMetrics } = useProduct();
  const totalLevel = await getAllCategoriesLevel(storeId).then(
    (res) => res?.data?.length
  );

  const allDataByCategory = await getProductsByCategory(
    storeId,
    params.categoryName
  ).then((res) => res?.data);

  const products = allDataByCategory?.products;
  const category = allDataByCategory?.category;

  const allProducts = await GetProducts().then((res) => res.products);

  console.log("totalLevel", totalLevel);
  const allFilterMetrics = await GetFilterMetrics(
    category?.level,
    "",
    category?._id
  ).then((res) => res.data);
  console.log(
    "allFilterMetrics",
    allFilterMetrics,
    "subcategories",
    allFilterMetrics?.categories
  );

  return (
    <div className="pb-10 px-4">
      <div className="container mx-auto px-0">
        {/* <Banner /> */}
        <div className="flex flex-col md:grid grid-cols-4 md:gap-10 md:py-5">
          <CategoryPageFilter
            allCategories={allFilterMetrics?.categories || []}
            brands={allFilterMetrics?.brands}
            colors={allFilterMetrics?.colors}
          />
          <div className="col-span-3 flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full">
              <div className="hidden md:flex justify-between min-w-full">
                <p className="capitalize font-semibold">
                  {params?.categoryName || "All Books"}{" "}
                </p>

                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <span>Sort By:</span>
                    <select
                      className="bg-gray-300 p-1 rounded-lg"
                      name=""
                      id=""
                    >
                      <option value="Default" selected>
                        Default
                      </option>
                      <option value="Default" selected>
                        Low to High
                      </option>
                      <option value="Default" selected>
                        High to Low
                      </option>
                      <option value="Default" selected>
                        Popularity
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Show:</span>
                    <select
                      className="bg-gray-300 p-1 rounded-lg"
                      name=""
                      id=""
                    >
                      <option value="Default" selected>
                        10
                      </option>
                      <option value="Default" selected>
                        20
                      </option>
                      <option value="Default" selected>
                        30
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:gap-5">
                {products?.length > 0 ? (
                  <ProductList books={products} allBooks={products} />
                ) : (
                  <div className="flex justify-center items-center">
                    <p>No Products found</p>
                  </div>
                )}
                <CategoryPagination />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5 mb-10">
          <strong className="text-xl md:text-base">You may also like</strong>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-5">
            {allProducts?.length > 0 &&
              allProducts
                ?.slice(0, 10)
                ?.map((book, index) => <ProductCard key={index} book={book} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
