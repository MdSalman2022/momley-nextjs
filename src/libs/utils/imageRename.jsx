function imageRename(files) {
  return files.map((file) => {
    const originalFileName = file.name;
    const fileExtension = originalFileName.split(".").pop();
    const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");

    // Replace special characters and spaces with empty strings in the file name
    const updatedFileName = fileNameWithoutExtension
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/\s/g, "");

    // Combine the updated file name with the original file extension
    const renamedFileName = updatedFileName + "." + fileExtension;

    // Create a new File object with the same properties and the updated name
    const sanitizedFile = new File([file], renamedFileName, {
      type: file.type,
    });
    return sanitizedFile;
  });
}

export default imageRename;
