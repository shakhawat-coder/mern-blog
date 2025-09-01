import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const MyBlogApi = createApi({
  reducerPath: "MyBlog",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN_NAME}${
      import.meta.env.VITE_API_BASE_URL
    }`,
  }),
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `/category`,
    }),
    getSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
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
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useGetHighlightBlogQuery,
} = MyBlogApi;
