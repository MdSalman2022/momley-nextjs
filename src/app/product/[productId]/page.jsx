import React from "react";
import {
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
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
import BreadcrumbComponent, {
  BreadCrumbComponent,
} from "./BreadCrumbComponent";
import ImageSection from "./ImageSection";
import { MdLibraryBooks, MdOutlineContentCopy } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { GiBlackBook } from "react-icons/gi";
import Link from "next/link";
import ProductShare from "./ProductShare";

const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

export async function generateMetadata({ params }) {
  const productId = params.productId;
  const { GetProductsById } = useProduct();
  const productDetails = await GetProductsById(productId);
  const bookDetails = productDetails?.data?.product;

  const cloudFrontURL = productDetails?.data?.cloudFrontURL;
  const description = stripHtmlTags(
    bookDetails?.description || "Product description"
  );

  console.log("description", description);

  return {
    title: bookDetails?.name || "Product",
    description: description || "Product description",
    openGraph: {
      title: bookDetails?.name || "Product",
      description: description || "Product description",
      images: bookDetails?.images?.map((image) => ({
        url: cloudFrontURL.replace("*", `products/${image}`),
        width: 800,
        height: 600,
        alt: bookDetails?.name,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: bookDetails?.name || "Product",
      description: description || "Product description",
      image: bookDetails?.images?.length
        ? cloudFrontURL.replace("*", `products/${bookDetails.images[0]}`)
        : undefined,
    },
  };
}

const extractNamesAndSlugs = async (category) => {
  const namesAndSlugs = [];

  // Add the main category
  if (category) {
    namesAndSlugs.push({
      name: category.name,
      slug: category.slug,
    });

    // Add the ancestors
    if (Array.isArray(category.ancestors)) {
      category.ancestors.reverse().forEach((ancestor) => {
        namesAndSlugs.push({
          name: ancestor.name,
          slug: ancestor.slug,
        });
      });
    }
  }

  return namesAndSlugs;
};

const BookDetails = async ({ params }) => {
  console.log("params", params);
  const productId = params.productId;
  const { GetProductsById } = useProduct();

  const productDetails = await GetProductsById(productId);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ];

  const bookDetails = productDetails?.data?.product;
  console.log("productDetails?.data", productDetails?.data);
  const cloudFrontURL = productDetails?.data?.cloudFrontURL;

  const items = await extractNamesAndSlugs(bookDetails?.category);

  console.log("items", items);

  console.log("bookDetails?.category", bookDetails?.category);

  return (
    <div className="bg-white px-4 md:px-0 mb-14 md:mb-0">
      <div className="block md:hidden relative">
        <BookCartControl bookDetails={bookDetails} />
      </div>
      <div className="container mx-auto px-0 text-black">
        <p className="pb-5 hidden md:block">
          {items?.length > 0 && <BreadCrumbComponent items={items} />}
        </p>
        <div className="flex flex-col md:grid grid-cols-4">
          <div className="col-span-3 flex flex-col md:grid grid-cols-2 md:gap-5 h-fit">
            <div className="flex flex-col md:flex-row col-span-2 w-full gap-3 md:gap-10">
              <div className="flex flex-col gap-5">
                <ImageSection
                  bookDetails={bookDetails}
                  cloudFrontURL={cloudFrontURL}
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between md:flex-col">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <h2 className="text-2xl">{bookDetails?.name}</h2>
                        <div className="flex md:hidden gap-1 items-center text-sm">
                          <span className="flex items-center gap-2">
                            {bookDetails?.stock?.quantity > 0 && (
                              <FaCheckCircle className="text-green-600" />
                            )}
                            {bookDetails?.stock?.quantity > 0 && "In Stock"}{" "}
                          </span>
                          <span className="text-[#dc3545]">
                            {bookDetails?.stock?.quantity < 10 &&
                              `(Only ${bookDetails?.stock?.quantity} left)`}
                          </span>
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col gap-3">
                        {bookDetails.specifications?.author && (
                          <p>By {bookDetails.specifications?.author}</p>
                        )}
                        {bookDetails.specifications?.author && (
                          <p>
                            Category:{" "}
                            <Link
                              href={`/category/${bookDetails?.category?.slug}`}
                              className="text-blue-600"
                            >
                              {bookDetails?.category?.name}
                            </Link>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-3xl md:text-4xl text-red-500 font-bold">
                        Tk {bookDetails?.salePrice || bookDetails?.price}
                      </div>
                      <div className="hidden md:flex gap-1 items-center text-sm">
                        <span className="flex items-center gap-2">
                          {bookDetails?.stock?.quantity > 0 && (
                            <FaCheckCircle className="text-green-600" />
                          )}
                          {bookDetails?.stock?.quantity > 0 && "In Stock"}{" "}
                        </span>
                        <span className="text-[#dc3545]">
                          {bookDetails?.stock?.quantity < 10 &&
                            `(Only ${bookDetails?.stock?.quantity} left)`}
                        </span>
                      </div>
                      <p className="text-sm hidden md:block">
                        {bookDetails?.stock?.quantity < 10 &&
                          "* স্টক আউট হওয়ার আগেই অর্ডার করুন"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="primary-btn w-fit">
                  Offer Ends in: 2 days 09:20:30
                </div> */}
                </div>
                <div className="hidden md:flex flex-col gap-4">
                  <BookCartControl bookDetails={bookDetails} />
                  <div className="flex items-center gap-5">
                    {bookDetails?.specifications?.bookLength && (
                      <span className="flex flex-col items-center gap-1">
                        <p className="text-xs">Book Length</p>
                        <MdOutlineContentCopy className="text-3xl" />
                        <p className="text-xs">
                          {bookDetails?.specifications?.bookLength} Pages
                        </p>
                      </span>
                    )}
                    {bookDetails?.specifications?.edition && (
                      <span className="flex flex-col gap-1">
                        <p className="text-xs">Edition</p>
                        <BiEdit className="text-3xl" />
                        <p className="text-xs">
                          {bookDetails?.specifications?.edition}
                        </p>
                      </span>
                    )}
                    {bookDetails?.specifications?.publication && (
                      <span className="flex flex-col gap-1">
                        <p className="text-xs">Book Length</p>
                        <GiBlackBook className="text-3xl" />
                        <p className="text-xs">
                          {bookDetails?.specifications?.publication}
                        </p>
                      </span>
                    )}
                  </div>
                  {/*   <div className="flex items-center gap-5">
                    Share:
                    <FaFacebookF className="bg-blue-500 p-1 text-3xl rounded-full text-white" />
                    <FaTwitter className="bg-sky-500 p-1 text-3xl rounded-full text-white" />
                    <FaInstagram className="bg-pink-500 p-1 text-3xl rounded-full text-white" />
                  </div> */}
                  <ProductShare />
                </div>
              </div>
            </div>
            <div className="flex col-span-2 items-start h-fit">
              <ProductDescription bookDetails={bookDetails} />
            </div>
          </div>
          <div className="col-span-1 hidden md:flex flex-col gap-5">
            <SecurityCard />
            <ReviewCard bookDetails={bookDetails} />
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
