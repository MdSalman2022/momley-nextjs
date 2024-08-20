import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import BookCartControl from "./BookCartControl";
import RelatedBooks from "./RelatedBooks";
import RecommendedBooks from "./RecommendedBooks";
import useBook from "@/hooks/useBook";
import ReviewCard from "./ReviewCard";
import SecurityCard from "./SecurityCard";
import laptop from "../../../../public/images/products/laptop.webp";
import Image from "next/image";
import useProduct from "@/hooks/useProduct";
import LoadingAnimation from "@/libs/utils/LoadingAnimation";
import ProductDescription from "./ProductDescription";

const BookDetails = async ({ params }) => {
  console.log("params", params);
  const productId = params.productId;
  const { GetProductsById } = useProduct();

  const productDetails = await GetProductsById(productId);

  const bookDetails = productDetails?.data;

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
                <BookCartControl bookDetails={bookDetails} />
                <p className="flex items-center gap-5">
                  Share:
                  <FaFacebookF className="bg-blue-500 p-1 text-3xl rounded-full text-white" />
                  <FaTwitter className="bg-sky-500 p-1 text-3xl rounded-full text-white" />
                  <FaInstagram className="bg-pink-500 p-1 text-3xl rounded-full text-white" />
                </p>
              </div>
            </div>
            <div className="flex col-span-2 items-start h-fit">
              <ProductDescription bookDetails={bookDetails} />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <SecurityCard />
            <ReviewCard />
            <RecommendedBooks productId={productId} />
          </div>
          <div className="col-span-4">
            <RelatedBooks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
