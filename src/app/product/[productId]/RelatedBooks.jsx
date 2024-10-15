import ProductCard from "@/components/Shared/ProductCard";
import useProduct from "@/hooks/useProduct";
import React from "react";

const RelatedBooks = async () => {
  const { GetProducts } = useProduct();

  const allProducts = await GetProducts();

  return (
    <div className="flex flex-col w-full">
      <p className="text-xl font-semibold">Related Products</p>
      <div className="col-span-4 grid grid-cols-2 md:grid-cols-6 gap-5 py-5">
        {allProducts.products?.slice(0, 6)?.map((book, index) => (
          <ProductCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
