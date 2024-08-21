import ProductCard from "@/components/Shared/ProductCard";
import useProduct from "@/hooks/useProduct";
import { storeId } from "@/libs/utils/common";
import React from "react";
import CategoryPageFilter from "../../category/[categoryName]/CategoryPageFilter";
import useCategory from "@/hooks/useCategory";
import SearchSection from "./SearchSection";

const sanitizeSearchTerm = (term) => {
  if (typeof term === "string" && term.length > 0) {
    return term.replace(/-/g, " ");
  }
  return "";
};

const SearchPage = async ({ params, searchParams }) => {
  console.log("params", params);
  console.log("searchParams", searchParams);
  const { GetProducts, SearchProduct, GetFilterMetrics } = useProduct();
  const { getAllCategories, getAllCategoriesLevel } = useCategory();
  const totalLevel = await getAllCategoriesLevel(storeId).then(
    (res) => res?.data?.length
  );
  // Ensure params.search is an array and has at least one element
  const searchText =
    Array.isArray(params.search) && params.search.length > 0
      ? sanitizeSearchTerm(params.search[0])
      : "";
  const allProducts = await GetProducts().then((res) => res.products);

  const level = 1;
  const allFilterMetrics = await GetFilterMetrics(level, searchText).then(
    (res) => res.data
  );

  console.log("allFilterMetrics", allFilterMetrics);

  const paramsCategorySearch =
    allFilterMetrics?.categories?.find(
      (c) => c.category === searchParams.category
    )?._id || "";

  console.log("paramsCategorySearch", paramsCategorySearch);

  const newSearchParams = {
    ...searchParams,
    category: paramsCategorySearch,
  };

  const searchProducts =
    (await SearchProduct(searchText, newSearchParams).then(
      (res) => res.data
    )) || [];

  console.log("searchProducts", searchProducts);

  console.log("allProducts", allProducts);

  console.log("totalLevel", totalLevel);

  const allSubcategories = await getAllCategories(storeId, totalLevel).then(
    (res) => res.data
  );

  console.log("allSubcategories", allSubcategories);

  const allSubcategoriesName = await allSubcategories?.map(
    (category) => category.name
  );

  console.log("allSubcategoriesName", allSubcategoriesName);

  return (
    <div className="flex flex-col container mx-auto gap-5">
      <SearchSection search={params?.search} searchText={searchText} />
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 w-full flex flex-col">
          <CategoryPageFilter
            allCategories={allFilterMetrics?.categories}
            brands={allFilterMetrics?.brands}
            colors={allFilterMetrics?.colors}
            categories={allSubcategoriesName}
            params={params}
            query={searchParams}
          />
        </div>
        <div className="col-span-3 grid grid-cols-5 gap-5">
          {searchProducts?.length > 0 ? (
            searchProducts?.map((product, index) => (
              <ProductCard key={index} book={product} />
            ))
          ) : (
            <div className="flex justify-center items-center h-screen w-full col-span-5">
              <h1 className="text-5xl">No products found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
