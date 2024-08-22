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

  return { createReview };
};

export default useReview;
