import { useState } from "react";
import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
  ScrollRestoration,
} from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RootLayout from "./components/RootLayout/RootLayout";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Blog from "./components/pages/Blog/Blog";
import BlogDetails from "./components/pages/BlogDetails/BlogDetails";
import CategoryBlog from "./components/pages/CategoryBlog/CategoryBlog";
import Author from "./components/pages/Author/Author";
import Contact from "./components/pages/Contact/Contact";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import Registration from "./components/pages/Registration/Registration";
import Login from "./components/pages/Login/Login";
import Dashboard from "./dashboard/Pages/Dashboard/Dashboard";
import AddCategory from "./dashboard/Pages/AddCategory/AddCategory";
import DashboardRootLayout from "./dashboard/DashboardRootLayout";
import AllCategories from "./dashboard/Pages/AllCategory/AllCategories";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<ScrollRestoration />} />
        <Route index element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/category/:id" element={<CategoryBlog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/dashboard" element={<DashboardRootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="/dashboard/categories" element={<AllCategories />} />
        </Route>

        {/* =======================dashboard====================== */}
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add-category" element={<AddCategory />} /> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
