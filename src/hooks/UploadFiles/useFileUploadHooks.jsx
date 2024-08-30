import { StateContext } from "@/contexts/StateProvider/StateProvider";
import { useContext, useEffect } from "react";

const useFileUpload = (
  files,
  setUploadProgress,
  setPreviewName,
  setFile,
  setIsUploading
) => {
  const { userInfo } = useContext(StateContext);

  const UploadFileToS3 = async () => {
    const getS3UploadUrl = `${process.env.VITE_SERVER_URL}/s3operations/get-default-s3-url`;

    const s3GetUrl = await fetch(getS3UploadUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.VITE_X_API_KEY,
      },
    });

    const getData = await s3GetUrl.json();

    return getData;
  };

  useEffect(() => {
    // console.log("files", files);
    const apiKey = process.env.VITE_X_API_KEY;

    if (!files || files.length === 0) {
      return; // No file selected, do nothing
    }

    const uploadFiles = async () => {
      const keysFromS3 = await UploadFileToS3();

      console.log("keysFromS3", keysFromS3);

      const url = keysFromS3?.url?.url;
      const policy = keysFromS3?.url?.fields?.Policy;
      const xAmzCredential = keysFromS3?.url?.fields["X-Amz-Credential"];
      const xAmzAlgorithm = keysFromS3?.url?.fields["X-Amz-Algorithm"];
      const xAmzDate = keysFromS3?.url?.fields["X-Amz-Date"];
      const xAmzSignature = keysFromS3?.url?.fields["X-Amz-Signature"];

      const uploadUrl = url;
      const cloudfrontURL = keysFromS3?.cloudFrontUrl;

      console.log("cloudfrontURL", cloudfrontURL);
      setIsUploading(true);

      const totalFiles = files.length;
      let completedCount = 0;

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        const currentTime = Date.now();

        const imageUrl = `temp/testFolder/${
          userInfo?.designerId || userInfo?._id
        }-${currentTime}-${file.name}`;

        try {
          const formData = new FormData();
          formData.append("key", imageUrl);
          formData.append("Policy", policy);
          formData.append("X-Amz-Credential", xAmzCredential);
          formData.append("X-Amz-Algorithm", xAmzAlgorithm);
          formData.append("X-Amz-Date", xAmzDate);
          formData.append("X-Amz-Signature", xAmzSignature);
          formData.append("file", file);

          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadUrl);
          xhr.setRequestHeader("X-API-KEY", apiKey);

          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const fileProgress = Math.round(
                (event.loaded / event.total) * 100
              );

              console.log("fileProgress", fileProgress);
              const overallProgress = Math.round(
                (completedCount / totalFiles) * 100 + fileProgress / totalFiles
              );

              setUploadProgress(overallProgress);
            }
          });

          await new Promise((resolve, reject) => {
            console.log("resolve", resolve);
            xhr.onload = function () {
              console.log("xhr data", xhr);
              if (xhr.status === 204) {
                const fileUrl = cloudfrontURL.replace("temp/*", imageUrl);
                setPreviewName((prevFileUrls) => {
                  const newFileUrls =
                    prevFileUrls?.length > 0
                      ? [...prevFileUrls, fileUrl]
                      : [fileUrl];
                  return newFileUrls;
                });
                setFile((prevFiles) => [...prevFiles, imageUrl]);

                completedCount++;
                if (completedCount === totalFiles) {
                  setIsUploading(false);
                  // console.log("All uploads finished");
                }

                resolve(fileUrl);
              } else {
                reject(`Error during file upload: ${xhr.status}`);
              }
            };

            xhr.onerror = function (error) {
              reject("Error during file upload:", error);
            };

            xhr.send(formData);
          });
        } catch (error) {
          console.error("File upload error:", error);
        }
      }
    };

    uploadFiles();
  }, [files, setUploadProgress, setPreviewName, setFile, setIsUploading]);
};

export default useFileUpload;
