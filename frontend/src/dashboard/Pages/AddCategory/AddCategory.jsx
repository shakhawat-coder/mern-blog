import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaXmark } from "react-icons/fa6";
import { useAddCategoryMutation } from "../../../Features/Api/dashboard.api";

const AddCategory = () => {
  const [addCategory, { data, error, isLoading }] = useAddCategoryMutation();
  console.log(addCategory);

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      image: Yup.mixed().required("Image is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // ✅ Create FormData for file upload
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("image", values.image);

        // ✅ Send to backend using RTK Query
        const response = await addCategory(formData).unwrap();

        toast.success("Category added successfully!");
        // ✅ Reset form
        resetForm();
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } catch (err) {
        console.error("❌ Error adding category:", err);
        toast.error(err?.data?.message || "Failed to add category");
      }
    },
  });

  // Handle file change with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      formik.setFieldValue("image", file);

      // Generate preview URL
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    } else {
      formik.setFieldValue("image", null);
      setPreview(null);
    }
  };
  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset file input
    }
  };

  return (
    <>
      <div className="py-section_gap">
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>

        <form
          className=" bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          {/* Category Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Category Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 mb-2">
              Category Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 mt-1">{formik.errors.image}</div>
            )}

            {/* ✅ Image Preview Below Input */}
            {preview && (
              <div className="mt-4 flex items-center gap-3 w-[100px] h-[100px] relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xl cursor-pointer text-red-500 hover:text-red-700 absolute -top-2 -right-2 "
                >
                  <FaXmark />
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600 transition"
          >
            {isLoading ? (
              <span className="animate-pulse">
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Adding...
              </span>
            ) : (
              "Add Category"
            )}
          </button>

          {formik.status && (
            <div className="text-green-500 mt-2">{formik.status}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddCategory;
