export const TruncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const formatTime = (time) => {
  return new Date(time).toLocaleDateString("en-US");
};
