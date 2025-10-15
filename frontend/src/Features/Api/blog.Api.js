import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const MyBlogApi = createApi({
  reducerPath: "MyBlog",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN_NAME}${
      import.meta.env.VITE_API_BASE_URL
    }`,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/category`,
      providesTags: ["Categories"],
    }),
    getSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    getDeleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    getAllBlog: builder.query({
      query: () => `/blog`,
    }),
    getSingleBlog: builder.query({
      query: (id) => `/blog/${id}`,
    }),
    getHighlightBlog: builder.query({
      query: () => `/highlight`,
    }),
    // ============get user registration via frontend===========
    getRegisterUser: builder.mutation({
      query: (userData) => ({
        url: `/register`, // adjust this path if your backend route differs
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getLoginUser: builder.mutation({
      query: (loginData) => ({
        url: `/login`, // adjust this path if your backend route differs
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getLoggedInUser: builder.query({
      query: () => ({
        url: "/me",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useGetDeleteCategoryMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useGetHighlightBlogQuery,
  useGetRegisterUserMutation,
  useGetLoginUserMutation,
  useGetLoggedInUserQuery,
} = MyBlogApi;
