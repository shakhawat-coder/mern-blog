const truncateText = (str, n = 250) => {
  if (!str) return "";
  // Remove HTML tags first
  const textOnly = str.replace(/<[^>]+>/g, "");
  return textOnly.length > n ? textOnly.substring(0, n) + "..." : textOnly;
};
export { truncateText };