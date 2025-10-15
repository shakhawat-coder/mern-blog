import { configureStore } from "@reduxjs/toolkit";
import { MyBlogApi } from "./Api/blog.Api";
import { DashboardApi } from "./Api/dashboard.api";
export const store = configureStore({
  reducer: {
    [MyBlogApi.reducerPath]: MyBlogApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      MyBlogApi.middleware,
      DashboardApi.middleware
    ),
});
