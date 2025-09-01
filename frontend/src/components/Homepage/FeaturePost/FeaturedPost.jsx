import React from "react";
import Heading from "../../commonComponents/Heading";
import blogimg from "/blog1.png";
import { Link } from "react-router";
import Button from "../../commonComponents/Button";
import {
  useGetAllBlogQuery,
  useGetHighlightBlogQuery,
} from "../../../Features/Api/blog.Api";

const FeaturedPost = () => {
  const highlight = useGetHighlightBlogQuery();
  const highlightBlogArray = highlight?.data?.data || [];
  const highlightBlogsId = highlightBlogArray
    .map((item) => item.blog?._id)
    .filter(Boolean);
  console.log("highlightBlogsId", highlightBlogsId);

  // Find the banner-blog object
  const featureObj = highlightBlogArray.find(
    (item) => item.slug === "featured-blog"
  );
  const featuredData = featureObj?.blog;

  const allBlog = useGetAllBlogQuery();
  const allBlogArray = allBlog?.data?.data || [];
  // console.log("allBlogArray", allBlogArray);

  const filteredBlogs = allBlogArray.filter(
    (blog) => !highlightBlogsId.includes(blog._id)
  );
  // console.log("filteredBlogs", filteredBlogs);

  const latestPost = [...filteredBlogs].reverse().slice(0, 4);
  console.log("latestPost", latestPost);

  return (
    <>
      <div className="py-section_gap">
        <div className="container mx-auto">
          <div className=" grid grid-cols-12 gap-10">
            <div className="col-span-7">
              <Heading title="Featured Post" className={"mb-10"} />
              <div className="group border border-gray-200 p-8">
                <div className="">
                  <picture>
                    <img
                      src={featuredData?.image[0]}
                      className="w-full"
                      alt="Featured Blog Post"
                    />
                  </picture>
                </div>
                <div className="pt-6">
                  <p>
                    By
                    <Link to={""} className="text-yellow-500">
                      John Doe
                    </Link>
                    | <em>May 1, 2025</em>
                  </p>
                  <Link
                    to={`/blog/${featuredData?._id}`}
                    className="text-[28px] font-bold leading-10 pt-5 group-hover:text-yellow-400 transition-all transition-duration-500"
                  >
                    {featuredData?.title}
                  </Link>
                  <p className="pt-4 pb-8">
                    {featuredData?.description.slice(0, 200)}
                  </p>
                  <Button buttonText="Read More" bgColor="bg-yellow-300" />
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="flex justify-between items-center">
                <Heading title="All Posts" className={"mb-10"} />
                <Link
                  to={"/blog"}
                  className="relative text-lg text-black hover:after:absolute hover:after:bg-yellow-400 hover:after:h-1 hover:after:w-full hover:after:bottom-0 hover:after:left-0 hover:after:transition-all hover:after:duration-500 hover:text-yellow-400 hover:transition-all transition-duration-500"
                >
                  {" "}
                  View All
                </Link>
              </div>
              <ul className="flex flex-col gap-1">
                {latestPost.map((item) => (
                  <li className="py-6 ps-6 pr-32 group hover:bg-light_yellow transition-all transition-duration-500">
                    <p className="pb-2">
                      By{" "}
                      <Link to={""} className="text-yellow-500">
                        John Doe
                      </Link>
                      | <em>May 1, 2025</em>
                    </p>
                    <Link
                      to={`/blog/${item._id}`}
                      className="text-2xl font-bold leading-8 pt-5 group-hover:text-yellow-400 transition-all transition-duration-500"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPost;
