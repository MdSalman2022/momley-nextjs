import ProductCard from "@/components/Shared/ProductCard";
import useProduct from "@/hooks/useProduct";
import { storeId } from "@/libs/utils/common";
import React from "react";
import CategoryPageFilter from "../../category/[categoryName]/CategoryPageFilter";
import useCategory from "@/hooks/useCategory";
import SearchSection from "./SearchSection";

const SearchPage = async ({ params }) => {
  const { GetProducts, SearchProduct } = useProduct();
  const { getProductsByCategory, getAllCategories, getAllCategoriesLevel } =
    useCategory();
  const totalLevel = await getAllCategoriesLevel(storeId).then(
    (res) => res?.data?.length
  );
  const allProducts = await GetProducts().then((res) => res.products);

  const sanitizeSearchTerm = (term) => term.replace(/-/g, " ");

  const searchText = sanitizeSearchTerm(params.search);
  const searchProducts = await SearchProduct(searchText).then(
    (res) => res.data
  );

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
            authors={allSubcategoriesName}
            categories={allSubcategoriesName}
          />
        </div>
        <div className="col-span-3 grid grid-cols-5 gap-5">
          {searchProducts?.length > 0 &&
            searchProducts?.map((product, index) => (
              <ProductCard key={index} book={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
