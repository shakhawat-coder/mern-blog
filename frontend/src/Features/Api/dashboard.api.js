import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DashboardApi = createApi({
  reducerPath: "DashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN_NAME}${
      import.meta.env.VITE_API_BASE_URL
    }`,
    credentials: "include",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // ✅ Clean, clear naming
    addCategory: builder.mutation({
      query: (categoryData) => ({
        url: `/category`,
        method: "POST",
        body: categoryData, // should be FormData
      }),
    }),
     getAllCategory: builder.query({
      query: () => `/category`,
      providesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: ({ id,categoryData }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: categoryData, // should be FormData
      }),
      invalidatesTags: ["Categories"],
    }),
     getDeleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

// ✅ export the correct hook
export const { useAddCategoryMutation, useGetAllCategoryQuery, useEditCategoryMutation, useGetDeleteCategoryMutation } = DashboardApi;
