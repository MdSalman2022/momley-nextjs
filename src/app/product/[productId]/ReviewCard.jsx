import React from "react";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ bookDetails }) => {
  const totalReviews = bookDetails?.reviews?.length || 0;
  const totalRating = bookDetails?.reviews?.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = totalReviews ? totalRating / totalReviews : 0;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`full-${i}`} />
          ))}
        {halfStar === 1 && <FaStarHalf />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
          ))}
      </>
    );
  };

  const getRatingPercentage = (rating) => {
    const count = bookDetails?.reviews?.filter(
      (review) => review.rating === rating
    ).length;
    return totalReviews ? (count / totalReviews) * 100 : 0;
  };

  console.log("rating", getRatingPercentage(5).toFixed(1));

  return (
    <div className="bg-[#F2F2F2] rounded-lg p-3">
      <p className="font-semibold text-xl">Review</p>
      <div className="flex gap-5">
        <div className="flex flex-col items-end gap-2">
          <p className="text-lg">{totalReviews} Customers</p>
          <p className="text-6xl">{averageRating.toFixed(1)}</p>
          <span className="flex items-center text-yellow-400">
            {renderStars(averageRating)}
          </span>
          <p className="text-[#999999]">out of 5</p>
        </div>
        <div className="flex flex-col items-start gap-5 w-full">
          <p>Rating</p>
          <div className="flex flex-col gap-3 w-full">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center h-4 w-full">
                <p className="text-[10px] w-4 flex items-start">{rating}</p>
                <span
                  className={`h-3 rounded ${
                    rating === 5
                      ? "bg-green-500"
                      : rating === 4
                      ? "bg-blue-500"
                      : rating === 3
                      ? "bg-orange-500"
                      : rating === 2
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${getRatingPercentage(rating)}%` }}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
