"use client";
import React, { useState } from "react";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/app/profile/orders/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import ProductsInventoryTable from "./ProductsInventoryTable";
import useProduct from "@/hooks/useProduct";
import { useQuery } from "react-query";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Inventory = () => {
  const router = useRouter();
  const { GetProducts, updateProductStatus } = useProduct();
  const [selectedProducts, setSelectedProducts] = useState([]);
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
  });

  const handleUpdateStatus = async (value, item) => {
    console.log("item", item);
    const payload = {
      slug: item?.original?.productSlug,
      inStock: value === "stock" ? true : false,
    };
    const updateOrder = await updateProductStatus(payload);
    console.log("updateOrder", updateOrder);
    if (updateOrder?.success) {
      toast.success("Order status updated successfully");
      refetchProducts();
    }
  };

  console.log("allProducts", allProducts);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("stock");

  const actions = [
    { value: "stock", label: "In Stock" },
    { value: "out", label: "Out of Stock" },
  ];

  const pages = ["All", "Active", "Inactive", "Stock Out"];
  const [activePage, setActivePage] = useState(pages[0]);

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };
  const paymentOptions = ["Paid", "Due", "Partial"];

  console.log("selectedProducts", selectedProducts);

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedProducts(
              value ? productList.map((item) => item.productSlug) : []
            );
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            console.log("value", value, row?.original?.id);
            setSelectedProducts((prev) => {
              if (value) {
                return [...prev, row?.original?.productSlug];
              } else {
                return prev.filter(
                  (item) => item !== row?.original?.productSlug
                );
              }
            });
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      accessorKey: "id", // Assuming each row has a unique 'id' field
    },
    {
      id: "productName",
      header: "Product Name",
      accessorKey: "productName",
    },
    {
      id: "Price",
      header: "Price",
      accessorKey: "Price",
    },
    {
      id: "SalePrice",
      header: "Sale Price",
      accessorKey: "SalePrice",
    },
    {
      id: "quantity",
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      id: "Sales",
      header: "Sales",
      accessorKey: "Sales",
    },
    /*   {
      id: "Vendor",
      header: "Vendor",
      accessorKey: "Vendor",
    }, */
    {
      id: "Stock",
      header: "Stock",
      accessorKey: "Stock", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("rowrowrow", row?.original);
        return (
          <Select
            onValueChange={(value) => handleUpdateStatus(value, row)}
            aria-label="Select action"
          >
            <SelectTrigger className="w-32 h-10 mt-1 border-0">
              <SelectValue
                placeholder={row?.original?.Stock ? "In Stock" : "Out of Stock"}
              />
            </SelectTrigger>
            <SelectContent>
              {actions.map((option, index) => {
                const value = option?.value || `fallback-value-${index}`;
                if (!option?.value) return null;
                return (
                  <SelectItem key={index} value={value}>
                    {option?.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );
      },
      enableSorting: false, // Assuming sorting is not needed for actions
    },
  ];

  const productList =
    !isProductLoading &&
    allProducts?.products?.map((product) => ({
      id: product._id,
      productSlug: product.slug,
      productName: product.name,
      Price: product.price,
      SalePrice: product.salePrice,
      quantity: product.stock?.quantity,
      Sales: product.sales?.total,
      vendor: product.vendor,
      Stock: product.stock?.inStock,
    }));

  console.log("productList", productList);

  if (isProductLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Inventory"
        onExport={() => console.log("Exporting...")}
        onImport={() => console.log("Importing...")}
        handleFunction={() => {
          if (selectedProducts.length === 1) {
            router.push(
              `/dashboard/products/edit-product/${selectedProducts[0]}`
            );
          } else {
            toast.error("Please select only one product to edit");
          }
        }}
        functionTitle="Edit Product"
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
          {/*   <input
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
          <p>{productList?.length} Orders</p>
          <DataTable
            columns={columns}
            data={productList}
            setSorting={setSorting}
            setColumnFilters={setColumnFilters}
            setColumnVisibility={setColumnVisibility}
            setRowSelection={setRowSelection}
            sorting={sorting}
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
            rowSelection={rowSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
