import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import Button from "../../commonComponents/Button";
import { useGetLoginUserMutation } from "../../../Features/Api/blog.Api";
const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { data, isLoading, error, isSuccess }] =
    useGetLoginUserMutation();

  //   ==============handle login form=================
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Values:", values);
      try {
        const { email, password } = values;
        const response = await loginUser({ email, password }).unwrap();
        alert("User login successfully!");
        navigate("/dashboard");
        resetForm();
      } catch (err) {
        alert(err?.data?.message || "Login failed!");
      }
    },
  });
  return (
    <>
      <div className="container mx-auto py-section_gap">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 mt-2">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 mt-2">{formik.errors.password}</p>
            )}
          </div>
          <Button buttonText="Login" widht="w-full" type="submit" />
        </form>
      </div>
    </>
  );
};

export default Login;
