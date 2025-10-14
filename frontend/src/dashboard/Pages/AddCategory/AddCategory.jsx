import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddCategory = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Values:", values);
      resetForm();
    },
  });
  return (
    <>
      <div className="py-section_gap">
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
        <form
          className="max-w-lg bg-white p-6 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
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
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 mt-1">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 mb-2">
              Category Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 mt-1">{formik.errors.image}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Category
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
