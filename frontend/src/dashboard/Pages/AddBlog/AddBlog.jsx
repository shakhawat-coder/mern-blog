import React, { useState, useRef, use } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaXmark } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";
import { useAddBlogMutation, useGetAllCategoryQuery } from "../../../Features/Api/dashboard.api";

 
const AddBlog = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoryQuery();
  // console.log("categoriew",categories);

  const[addBlog,{isLoading}]=useAddBlogMutation()

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      image: null,
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Category name is required"),
      category: Yup.string().required("Category id is required"),
      image: Yup.mixed().required("Image is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // ✅ Create FormData for file upload
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("description", values.description);
        values.image.forEach((img) => {
          formData.append("image", img);
      });

        // ✅ Send to backend using RTK Query
        const response = await addBlog(formData).unwrap();

        toast.success("Blog added successfully!");
        // ✅ Reset form
        resetForm();
        setPreview([]);
        if (fileInputRef.current) fileInputRef.current.value = null;
        if (editorRef.current) editorRef.current.setContent("");
      } catch (err) {
        console.error("❌ Error adding category:", err);
        toast.error(err?.data?.message || "Failed to add category");
      }
    },
  });

  // Handle file change with preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
      formik.setFieldValue("image", files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreview(imagePreviews);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = formik.values.image.filter((_, i) => i !== index);
    formik.setFieldValue("image", updatedImages);
    
    const updatedPreviews = preview.filter((_, i) => i !== index);
    setPreview(updatedPreviews);

    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset file input
    }
    if (updatedPreviews.length === 0) {
      setPreview(null);
    }
  };

  return (
    <>
      <div className="py-section_gap">
        <h2 className="text-2xl font-semibold mb-4">Add Blog</h2>

        <form
          className=" bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          {/* Blog Title */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 mt-1">{formik.errors.title}</div>
            )}
          </div>
          {/* Category Selection */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
               {categories?.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                  {category.name}
                </option>
          ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 mt-1">{formik.errors.category}</div>
            )}
          </div>

          {/* Blog Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
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
                  onClick={() => handleRemoveImage(0)}
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
            <Editor
              apiKey="d60q4t3t1sksdhafbecbm1rgarw0fje23uh4dnk6rtlk6zud"
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={formik.values.description}
              onEditorChange={(content) =>
                formik.setFieldValue("description", content)
              }
              init={{
                height: 300,
                menubar: false,
                plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
      "emoticons",
    ],
    toolbar:
      "undo redo | fontfamily fontsize blocks | " +
      "bold italic underline strikethrough forecolor backcolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | " +
      "link image media table | blockquote subscript superscript removeformat | " +
      "fullscreen preview code help emoticons",
    font_family_formats:
      "Arial=arial,helvetica,sans-serif;" +
      "Courier New=courier new,courier,monospace;" +
      "Georgia=georgia,palatino;" +
      "Tahoma=tahoma,arial,helvetica,sans-serif;" +
      "Times New Roman=times new roman,times;" +
      "Verdana=verdana,geneva;",
    fontsize_formats: "10px 12px 14px 16px 18px 24px 36px 48px",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; line-height:1.6 }",
              }}
            />
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
                  className="inline w-4 h-4 me-3 text-white animate-spin"
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

export default AddBlog;
