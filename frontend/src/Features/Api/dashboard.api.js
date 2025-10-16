import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN_NAME}${
      import.meta.env.VITE_API_BASE_URL
    }`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // ✅ Clean, clear naming
    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: `/category`,
        method: "POST",
        body: categoryData, // should be FormData
      }),
    }),
    editCategory: builder.mutation({
      query: ({ id, ...categoryData }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: categoryData, // should be FormData
      }),
    }),
  }),
});

// ✅ export the correct hook
export const { useAddCategoryMutation, useEditCategoryMutation } = DashboardApi;
