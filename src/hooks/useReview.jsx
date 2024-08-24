const useReview = () => {
  const createReview = async (payload) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/review/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const review = await response.json();
      return review;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error;
    }
  };
  const getReviewByStore = async (id) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/review/get-reviews-by-store?storeId=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const review = await response.json();
      return review;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error;
    }
  };

  const updateReviewStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/review/update-review-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewId: id,
            status: status,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const review = await response.json();
      return review;
    } catch (error) {
      console.error("Failed to fetch book details:", error);
      throw error;
    }
  };

  return { createReview, getReviewByStore, updateReviewStatus };
};

export default useReview;
