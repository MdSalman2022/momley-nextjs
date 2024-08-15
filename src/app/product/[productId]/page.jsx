"use client";
import React, { Suspense, useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Loading from "@/components/Shared/Loading";
import BookCartControl from "./BookCartControl";
import RelatedBooks from "./RelatedBooks";
import RecommendedBooks from "./RecommendedBooks";
import useBook from "@/hooks/useBook";
import ReviewCard from "./ReviewCard";
import SecurityCard from "./SecurityCard";
import laptop from "../../../../public/images/products/laptop.webp";
import Image from "next/image";
import { useQuery } from "react-query";

const BookDetails = ({ params }) => {
  const productId = params.productId;
  const { getBookDetails } = useBook();
  const [activeTab, setActiveTab] = useState("description");

  const {
    data: productDetails = {},
    isLoading: isBookDetailsLoading,
    refetch: refetchBookDetails,
  } = useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => productId && getBookDetails(productId),
    cacheTime: 10 * (60 * 1000),
    staleTime: 5 * (60 * 1000),
  });
  const bookDetails = productDetails?.data;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(
    "bookDetails?.specification",
    bookDetails,
    bookDetails?.specifications
  );

  if (!bookDetails) {
    return <Loading />;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto text-black">
        <p className="py-5">
          Home/ Categories / {bookDetails?.categoryInfo?.category}
        </p>
        <div className="grid grid-cols-4">
          <div className="col-span-3 grid grid-cols-2 gap-5 h-fit">
            <div className="flex col-span-2 w-full gap-10">
              <div className="flex flex-col gap-5">
                <Image
                  className="object-contain w-full h-full"
                  src={laptop}
                  width={360}
                  height={400}
                />
                {bookDetails.images && bookDetails.images.length > 1 && (
                  <div className="flex items-center gap-5">
                    {bookDetails.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className="w-[100px] h-[100px] object-contain border"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h2 className="text-2xl">{bookDetails?.name}</h2>
                  <div className="text-4xl text-red-500 font-bold">
                    Tk {bookDetails?.salePrice || bookDetails?.price}
                  </div>
                </div>
                <div className="primary-btn w-fit">
                  Offer Ends in: 2 days 09:20:30
                </div>
                <BookCartControl />
                <p className="flex items-center gap-5">
                  Share:
                  <FaFacebookF className="bg-blue-500 p-1 text-3xl rounded-full text-white" />
                  <FaTwitter className="bg-sky-500 p-1 text-3xl rounded-full text-white" />
                  <FaInstagram className="bg-pink-500 p-1 text-3xl rounded-full text-white" />
                </p>
              </div>
            </div>
            <div className="flex col-span-2 items-start h-fit">
              <div className="flex flex-col py-10">
                <div className="flex gap-10 py-5">
                  <span
                    className={`cursor-pointer border-b-2 ${
                      activeTab === "description"
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => handleTabClick("description")}
                  >
                    Description
                  </span>
                  <span
                    className={`cursor-pointer border-b-2 ${
                      activeTab === "specification"
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => handleTabClick("specification")}
                  >
                    Specification
                  </span>
                  <span
                    className={`cursor-pointer border-b-2 ${
                      activeTab === "review"
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => handleTabClick("review")}
                  >
                    Review
                  </span>
                </div>

                <div className="flex flex-col gap-5 mr-2">
                  {activeTab === "description" && (
                    <p>
                      {bookDetails.description
                        .split("\n")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </p>
                  )}
                  {activeTab === "specification" && (
                    <div className="flex flex-col gap-1">
                      {bookDetails?.specifications ? (
                        <span className="flex flex-col gap-1">
                          {Object.entries(bookDetails.specifications).map(
                            ([label, value]) => (
                              <span key={label}>
                                <strong>{label}:</strong> {value}
                              </span>
                            )
                          )}
                        </span>
                      ) : (
                        <div>No specifications available.</div>
                      )}
                    </div>
                  )}
                  {activeTab === "review" && <div>Review Content</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <SecurityCard />
            <ReviewCard />
            <RecommendedBooks productId={productId} />
          </div>
          <div className="col-span-4">
            <RelatedBooks productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
