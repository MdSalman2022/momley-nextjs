import React from "react";
import { FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
import Banner from "@/components/Main/Home/Banner/page";
import BookCard from "@/components/Shared/BookCard";
import useCategory from "@/app/hooks/useCategory";
import AuthorsList from "./AuthorsList";
import CategoryList from "./CategoryList";
import PriceRange from "./PriceRange";
import CategoryPagination from "./CategoryPagination";
import ResetButton from "./ResetButton";
import BooksList from "./BooksList";
import CategoryPageTitle from "./CategoryPageTitle";
import useBook from "@/app/hooks/useBook";

const Category = async ({ params }) => {
  const { getBooksByCategory } = useCategory();
  const data = await getBooksByCategory(params.categoryName);

  const { getAllCategories, getAllAuthors, getAllBookDetails } = useBook();

  const categories = await getAllCategories();

  const authors = await getAllAuthors();

  const allBooks = await getAllBookDetails(1, 20);

  console.log("category categories", categories);

  return (
    <div className="pb-10">
      <div className="container mx-auto ">
        <Banner />
        <div className="grid grid-cols-4 gap-10 py-5">
          <div className="col-span-1 border rounded-lg flex flex-col gap-5 max-h-none">
            <div className="flex flex-col p-3">
              <div className="flex items-center justify-between">
                <span className="flex gap-5 items-center">Price </span>
                {/* <FaChevronUp /> */}
                <ResetButton />
              </div>
              <PriceRange />
            </div>
            <div className="flex flex-col p-3">
              <div className="flex items-center justify-between">
                <span className="flex gap-5 items-center">Writers </span>
                {/* <FaChevronUp /> */}
                <ResetButton />
              </div>
              <AuthorsList authors={authors} />
            </div>
            <div className="flex flex-col p-3">
              <div className="flex items-center justify-between">
                <span className="flex gap-5 items-center">Publisher </span>
                {/* <FaChevronUp /> */}

                <ResetButton />
              </div>
              <div>
                <CategoryList categories={categories} />
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <CategoryPageTitle />
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <span>Sort By:</span>
                    <select
                      className="bg-gray-300 p-1 rounded-lg"
                      name=""
                      id=""
                    >
                      <option value="Default" selected>
                        Default
                      </option>
                      <option value="Default" selected>
                        Low to High
                      </option>
                      <option value="Default" selected>
                        High to Low
                      </option>
                      <option value="Default" selected>
                        Popularity
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>Show:</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <BooksList books={data} allBooks={allBooks?.books} />
                <CategoryPagination />
              </div>
            </div>
          </div>
        </div>
        <strong>You may also like</strong>
        <div className="grid grid-cols-6 gap-5">
          {allBooks?.books?.length > 0 &&
            allBooks?.books
              ?.slice(0, 10)
              ?.map((book, index) => <BookCard key={index} book={book} />)}
        </div>
      </div>
    </div>
  );
};

export default Category;
