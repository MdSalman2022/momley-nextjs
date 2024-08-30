function useMoveAssetsUsersHooks(fileData, destPathText) {
  const moveAssets = async () => {
    const fileKeys = fileData;
    const destPath = `users/${destPathText}`;
    const moveData = { fileKeys, destPath };

    console.log("moveData", moveData);

    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_URL}/s3operations/move-assets`,
        {
          method: "POST",
          body: JSON.stringify(moveData),
          headers: {
            "Content-type": "application/json",
            "x-api-key": process.env.VITE_X_API_KEY,
          },
        }
      );

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        return result;
        // Handle successful response
      } else {
        // Handle error response
        throw new Error("Failed to move assets");
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  };

  return moveAssets();
}

export default useMoveAssetsUsersHooks;
