// Helper to extract public ID from Cloudinary URL
function getPublicIdFromUrl(url) {
  // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/BlogImages/abc123.jpg
  // We want: BlogImages/abc123
  const parts = url.split("/");
  const folderAndFile = parts.slice(-2).join("/"); // BlogImages/abc123.jpg
  return folderAndFile.replace(/\.[^/.]+$/, ""); // Remove extension
}
module.exports = { getPublicIdFromUrl };
