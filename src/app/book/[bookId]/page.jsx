import React, { Suspense } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMinus,
  FaPlus,
  FaTwitter,
  FaShippingFast,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import Loading from "@/components/Shared/Loading";
import BookCartControl from "./BookCartControl";
import RelatedBooks from "./RelatedBooks";
import RecommendedBooks from "./RecommendedBooks";
import useBook from "@/hooks/useBook";
import ReviewCard from "./ReviewCard";
import SecurityCard from "./SecurityCard";
import laptop from "../../../../public/images/products/laptop.webp";
import Image from "next/image";
import useScrollToTop from "@/hooks/useScrollToTop";

const BookDetails = async ({ params }) => {
  console.log("params", params);
  const bookId = params.bookId;
  const { getBookDetails } = useBook();
  let bookDetails = await getBookDetails(params.bookId);
  bookDetails = bookDetails?.data;
  console.log("bookDetails", bookDetails);

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-white">
        <div className="container mx-auto text-black">
          <p className="py-5">
            Home/ Categories / {bookDetails?.categoryInfo?.category}
          </p>
          {/* <Login /> */}
          <div className="grid grid-cols-4">
            <div className="col-span-3 grid grid-cols-2 gap-5 h-fit">
              <div className="flex col-span-2 w-full gap-10">
                <div className="flex flex-col gap-5">
                  <Image
                    className="object-contain w-full md:w-fit lg:w-[360px] h-[400px]"
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
                      Tk {bookDetails?.price}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <span className="flex items-center gap-2">
                      <span className="font-bold">Writer:</span>
                      <span>{bookDetails?.specification?.author}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold">Publisher:</span>
                      <span>{bookDetails?.specification?.brand}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold">Category:</span>
                      <span>{bookDetails?.categoryInfo?.category}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold">Availability:</span>
                      <span>In Stock</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold">SKU:</span>
                      <span> {bookDetails?.inventory?.sku}</span>
                    </span>
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
                    <span className="border-b-2 border-black">Description</span>
                    <span className="">Additional information</span>
                    <span className="">Review</span>
                  </div>

                  <div className="flex flex-col gap-5 mr-2">
                    <p>{bookDetails.description}</p>

                    <p className="text-xl">Specification</p>
                    <div>
                      <div className="grid grid-cols-4">
                        <span>Category</span>
                        <span className="col-span-2">
                          {bookDetails?.categoryInfo?.category} ||{" "}
                          {bookDetails?.categoryInfo?.subCategory} ||{" "}
                          {bookDetails?.categoryInfo?.subSubCategory} ||{" "}
                          {bookDetails?.categoryInfo?.subSubSubCategory}
                        </span>
                      </div>
                      <div className="grid grid-cols-4">
                        <span>Author</span>
                        <span className="col-span-2">
                          {bookDetails?.specification?.author}
                        </span>
                      </div>
                      <div className="grid grid-cols-4">
                        <span>Brand</span>
                        <span className="col-span-2">
                          {bookDetails?.specification?.brand}
                        </span>
                      </div>
                      <div className="grid grid-cols-4">
                        <span>Manufacturer</span>
                        <span className="col-span-2">
                          {bookDetails?.specification?.supplier}
                        </span>
                      </div>
                      <div className="grid grid-cols-4">
                        <span>Weight</span>
                        <span className="col-span-2">
                          {bookDetails?.shipping?.weight}
                        </span>
                      </div>
                    </div>
                    <p>{bookDetails?.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-5">
              <SecurityCard />
              <ReviewCard />
              <RecommendedBooks bookId={bookId} />
            </div>
            <div className="col-span-4">
              <RelatedBooks bookId={bookId} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default BookDetails;
