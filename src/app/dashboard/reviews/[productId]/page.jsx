"use client";
import useProduct from "@/hooks/useProduct";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import React from "react";
import { useQuery } from "react-query";

const ProductReviews = ({ params }) => {
  const { GetProductReviewsById } = useProduct();

  const productSlug = params?.productId;
  const {
    data: productDetails = {},
    isLoading: isProductDetailsLoading,
    refetch: refetchProductDetails,
  } = useQuery({
    queryKey: ["productDetails", productSlug],
    queryFn: () => productSlug && GetProductReviewsById(productSlug),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });

  const product = productDetails?.data || {};
  const reviews = product.reviews || [];

  console.log("productDetails", productDetails);
  console.log("product", product);

  if (isProductDetailsLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-lg p-4 mb-4 border">
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {review.customerId.firstName}
                  </h3>
                </div>
                <div className="mt-2">
                  <p className="font-bold">Rating: {review.rating} / 5</p>
                  <p className="mt-1">{review.reviewText}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Order Created:</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.orderId.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Order Delivered:</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.orderId.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Review Given:</p>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews available for this product.</p>
      )}
    </div>
  );
};

export default ProductReviews;
