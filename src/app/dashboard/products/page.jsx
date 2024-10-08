"use client";
import React, { useEffect, useState } from "react";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateProductModal from "./CreateProductModal";
import ProductsTable from "./ProductsTable";
import useProduct from "@/hooks/useProduct";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

const Products = () => {
  const router = useRouter();
  const { GetProducts } = useProduct();
  const [searchText, setSearchText] = useState("");
  const {
    data: allProducts = {},
    isLoading: isProductLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => GetProducts(searchText),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  console.log("allProducts", allProducts);
  const pages = ["All", "Active", "Inactive", "Stock Out"];
  const [activePage, setActivePage] = useState(pages[0]);
  const paymentOptions = ["Paid", "Due", "Partial"];
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Products"
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
        handleFunction={() => router.push("/dashboard/products/create_product")}
        functionTitle="Add a New Product"
      />

      <div className="flex flex-col gap-5 p-6 border rounded">
        <div className="flex items-center gap-3">
          {pages.map((page, index) => (
            <button
              type="button"
              onClick={() => setActivePage(page)}
              key={index}
              className={`text-sm px-3 ${
                activePage === page
                  ? "border-b-2 border-black font-semibold"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="flex gap-5 items-center">
          <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Search products name, ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/*           <input
            type="text"
            className="input-box bg-[#F2F1F1] border-[#F2F2F2]"
            placeholder="Payments Status"
          /> */}
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-40 h-10 mt-1 bg-[#F2F1F1] border-[#F2F2F2]">
              <SelectValue placeholder="Payments Status" />
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((option, index) => (
                // Ensure each SelectItem has a unique key
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={() => refetchProducts()}
            type="button"
            className="primary-btn"
          >
            Search
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <p>{allProducts.products?.length} Orders</p>
          <ProductsTable
            allProducts={allProducts.products}
            isProductLoading={isProductLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
