"use client";
import { StateContext } from "@/contexts/StateProvider/StateProvider";
import React, { useContext } from "react";

const CategoryPagination = () => {
  const { setPage, page, totalPages } = useContext(StateContext);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (totalPages > 0)
    return (
      <div className="col-span-4 flex items-center gap-10 justify-center">
        <button
          className="primary-btn"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="primary-btn"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    );
};

export default CategoryPagination;
