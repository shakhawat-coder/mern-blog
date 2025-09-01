const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinaryFile = async (localFilePath, folder = "MyBlog") => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      folder,
    });
    if (uploadResult) {
      fs.unlinkSync(localFilePath);
    }
    return uploadResult;
  } catch (error) {
    console.log(`Upload error: ${error}`);
  }
};

const deleteCloudinaryFile = async (filepath) => {
  try {
    const delteItem = cloudinary.api.delete_resources([filepath], {
      type: "upload",
    });
    return delteItem;
  } catch (error) {
    console.log(`deleteCloudinaryFile Error`, error);
  }
};

module.exports = { uploadCloudinaryFile, deleteCloudinaryFile };
