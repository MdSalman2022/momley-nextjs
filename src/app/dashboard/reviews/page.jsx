import React from "react";

const reviews = [
  {
    id: 1,
    productName: "Product 1",
    reviewerName: "John Doe",
    rating: 4,
    comment: "Great product! Highly recommend.",
    date: "2023-10-01",
  },
  {
    id: 2,
    productName: "Product 2",
    reviewerName: "Jane Smith",
    rating: 5,
    comment: "Excellent quality and fast shipping.",
    date: "2023-10-02",
  },
  // Add more reviews as needed
];

const Reviews = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{review.productName}</h3>
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.reviewerName}</span>
              <span className="text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
