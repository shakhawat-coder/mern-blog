import { useParams, useLocation, useNavigate } from "react-router";
import React, { useState, useRef, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useEditCategoryMutation } from "../../../Features/Api/dashboard.api";

const UpdateCategory = () => {
  const { id } = useParams(); // Get ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryData } = location.state || {};
  // console.log("Category Data:", categoryData);
  const [editCategory,{data,isLoading,error}]=useEditCategoryMutation()
  console.log(data);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const fileInputRef = useRef(null);

  // Initialize form with category data
  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name || "",
        description: categoryData.description || "",
      });
      // Set default preview from category data
      if (categoryData.image) {
        setPreviewUrl(
          Array.isArray(categoryData.image)
            ? categoryData.image[0]
            : categoryData.image
        );
      }
    }
  }, [categoryData]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for new file
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Handle remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    // Reset to default image from categoryData
    if (categoryData?.image) {
      setPreviewUrl(
        Array.isArray(categoryData.image)
          ? categoryData.image[0]
          : categoryData.image
      );
    } else {
      setPreviewUrl("");
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("description", formData.description);
      if (selectedFile) {
        updatedData.append("image", selectedFile);
      }

      const response = await editCategory({ id, categoryData: updatedData }).unwrap();
      console.log("Category updated successfully:", response);
      navigate("/dashboard/categories");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <div className="py-section_gap mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 px-4">
          Edit Category
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 font-semibold mb-2"
              >
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
              />
            </div>

            {/* Category Image */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-600 font-semibold mb-2"
              >
                Category Image
              </label>

              {/* File Input */}
              <input
                type="file"
                id="image"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              {/* Image Preview */}
              {previewUrl && (
                <div className="mt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-[120px] h-[120px] relative flex-shrink-0">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                      />

                      {/* Remove button - only show when a new file is selected */}
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          <FaXmark />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* No image state */}
              {!previewUrl && !categoryData?.image && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md text-center">
                  <p className="text-gray-500 text-sm">No image selected</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-600 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter category description"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Update Category
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
