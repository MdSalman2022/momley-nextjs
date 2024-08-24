"use client";
import { DataTable } from "@/app/profile/orders/data-table";
import TopActionButtons from "@/components/Dashboard/TopActionButtons";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";
import avatar from "@/../public/images/profile/avatar.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useOrder from "@/hooks/useOrder";
import useProduct from "@/hooks/useProduct";
import { useQuery } from "react-query";
import { storeId } from "@/libs/utils/common";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useReview from "@/hooks/useReview";
import toast from "react-hot-toast";

const ReviewPermissions = () => {
  const route = useRouter();
  const { getReviewByStore, updateReviewStatus } = useReview();
  const { getReviewedOrderByStore } = useOrder();
  const { GetReviewedProducts } = useProduct();

  const status = ["pending", "approved", "rejected"];

  const handleUpdateStatus = async (id, status) => {
    console.log("result", id, status);
    try {
      const response = await updateReviewStatus(id, status);
      if (response?.success) {
        toast.success("Review status updated successfully");
        refetchReviews();
      } else {
        toast.error("Failed to update review status");
      }
    } catch (error) {
      console.error("Failed to update review status:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("productsReview");
  const {
    data: myorders = {},
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["myorders", storeId],
    queryFn: () => storeId && getReviewedOrderByStore(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });
  const {
    data: myproducts = {},
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["myproducts", storeId],
    queryFn: () => storeId && GetReviewedProducts(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const {
    data: myreviews = {},
    isLoading: isReviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["myreviews", storeId],
    queryFn: () => storeId && getReviewByStore(storeId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  console.log("myorders", myorders);
  console.log("myproducts", myproducts);
  console.log("myreviews", myreviews);
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    return (totalRating / reviews.length).toFixed(2); // Keeping two decimal places
  };

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [selectedStatus, setSelectedStatus] = useState("Active");

  const handleValueChange = (value) => {
    setSelectedStatus(value);
  };

  const columnsByProduct = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      accessorKey: "id", // Assuming each row has a unique 'id' field
    },
    {
      id: "ProductName",
      header: "Product Name",
      accessorKey: "ProductName",
    },
    {
      id: "orderNumber",
      header: "Order Number",
      accessorKey: "orderNumber",
    },
    {
      id: "Date",
      header: "Date",
      accessorKey: "Date",
    },
    {
      id: "SalePrice",
      header: "Sale Price",
      accessorKey: "SalePrice",
    },
    {
      id: "Color",
      header: "Color",
      accessorKey: "Color",
    },
    {
      id: "Stock",
      header: "Stock",
      accessorKey: "Stock",
    },
    {
      id: "Rating",
      header: "Rating",
      accessorKey: "Rating",
    },
    {
      id: "Status",
      header: "Status",
      accessorKey: "Status", // Assuming actions are tied to the row's unique 'id'
      cell: ({ row }) => {
        console.log("rowrow", row?.original);
        return (
          <Select
            onValueChange={(value) =>
              handleUpdateStatus(row?.original?.id, value)
            }
            aria-label="Select action"
          >
            <SelectTrigger className="w-24 h-8 border text-xs">
              <SelectValue placeholder={row.original.Status} />
            </SelectTrigger>
            <SelectContent>
              {status.map((option, index) => {
                const value = option || `fallback-value-${index}`;
                if (!option) return null;
                return (
                  <SelectItem key={index} value={value}>
                    {value}
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

  const dataOfReviews = !isReviewsLoading
    ? myreviews?.data?.map((review) => ({
        id: review._id,
        ProductName: (
          <span className="flex items-center gap-1">
            <div className="flex flex-col">
              <Link
                className="text-[#2F80ED] font-semibold"
                href={`/product/${review.product.slug}`}
              >
                {review.product.name}
              </Link>
            </div>
          </span>
        ),
        orderNumber: review.orderId?.orderNumber,
        Date: new Date(review.createdAt).toLocaleDateString(),
        SalePrice: review.product.salePrice,
        Color: review.product.color,
        Stock: review.product.stock.inStock ? "In Stock" : "Out of Stock",
        Rating: (
          <span className="flex items-center gap-1">
            <Link
              className="text-[#2F80ED] font-semibold"
              href={`/dashboard/reviews/${review.product.slug}`}
            >
              {review.rating}
            </Link>
          </span>
        ),
        Status: review.status,
      }))
    : [];
  console.log("dataOfReviews", dataOfReviews);

  const columnsByOrder = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      accessorKey: "id", // Assuming each row has a unique 'id' field
    },
    {
      id: "orderNumber",
      header: "Order Number",
      accessorKey: "orderNumber",
    },
    {
      id: "Date",
      header: "Date",
      accessorKey: "Date",
    },
    {
      id: "TotalAmount",
      header: "Total Amount",
      accessorKey: "TotalAmount",
    },
    {
      id: "Items",
      header: "Items",
      accessorKey: "Items",
    },
    {
      id: "Rating",
      header: "Rating",
      accessorKey: "Rating",
    },
  ];

  const dataOfOrders = !isOrdersLoading
    ? myorders?.data?.map((order, index) => ({
        id: order._id,
        orderNumber: (
          <span className="flex items-center gap-1">
            <Link
              href={`/profile/reviews/${order.orderNumber}`}
              className="flex flex-col text-[#2F80ED] font-semibold"
            >
              <span>{order.orderNumber}</span>
            </Link>
          </span>
        ),
        Date: new Date(order.createdAt).toLocaleDateString(),
        TotalAmount: order.totalAmount,
        Items: order.items?.length,
        Rating: (
          <span className="flex items-center gap-1">
            <Link
              className="text-[#2F80ED] font-semibold"
              href={`/profile/reviews/${order.orderNumber}`}
            >
              {calculateAverageRating(order.reviewIds)}
            </Link>
          </span>
        ),
        Status: order?.reviewIds[index]?.status,
      }))
    : [];

  return (
    <div className="flex flex-col gap-5">
      <TopActionButtons
        title="Review List"
        handleFunction={() => console.log("Creating Order...")}
        functionTitle="Create a review"
      />

      <div className="border rounded flex flex-col gap-5 p-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-start space-x-4">
            <span
              className={`cursor-pointer rounded-lg ${
                activeTab === "productsReview"
                  ? "font-bold bg-black text-white p-2"
                  : "p-2 border border-black"
              }`}
              onClick={() => setActiveTab("productsReview")}
            >
              All Reviews
            </span>
            <span
              className={`cursor-pointer rounded-lg ${
                activeTab === "ordersReview"
                  ? "font-bold bg-black text-white p-2"
                  : "p-2 border border-black"
              }`}
              onClick={() => setActiveTab("ordersReview")}
            >
              Review By Order
            </span>
          </div>
          {/* <div className="flex py-5 gap-5">
            <input
              placeholder="Search page"
              type="text"
              className="input-box rounded-none"
            />
          </div> */}
        </div>
        <DataTable
          columns={
            activeTab === "ordersReview" ? columnsByOrder : columnsByProduct
          }
          data={activeTab === "ordersReview" ? dataOfOrders : dataOfReviews}
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
  );
};

export default ReviewPermissions;
