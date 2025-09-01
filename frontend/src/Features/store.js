import { configureStore } from "@reduxjs/toolkit";
import { MyBlogApi } from "./Api/blog.Api";
export const store = configureStore({
  reducer: {
    [MyBlogApi.reducerPath]: MyBlogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MyBlogApi.middleware),
});
