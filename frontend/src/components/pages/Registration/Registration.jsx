import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Button from "../../commonComponents/Button";
import { useGetRegisterUserMutation } from "../../../Features/Api/blog.Api";

const Registration = () => {
  // ✅ Proper RTK mutation hook destructuring
  const [registerUser, { data, isLoading, error, isSuccess }] =
    useGetRegisterUserMutation();
  const navigate = useNavigate();

  // ✅ Handle registration form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be 50 characters or less"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Values:", values);
      try {
        // ✅ Send only required fields to backend
        const { name, email, password } = values;
        const response = await registerUser({ name, email, password }).unwrap();

        alert("User registered successfully!");
        navigate("/login");
        resetForm();
      } catch (err) {
        alert(err?.data?.message || "Registration failed!");
      }
    },
  });

  return (
    <div className="container mx-auto py-section_gap">
      <h1 className="text-3xl font-bold mb-6 text-center">Registration</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <Button
          type="submit"
          buttonText={isLoading ? "Registering..." : "Register"}
          bgColor="bg-yellow-500"
          width="w-full"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default Registration;
