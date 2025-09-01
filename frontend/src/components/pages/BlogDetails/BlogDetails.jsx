import React from "react";
import author1 from "/author1.png";
import image1 from "/startup.png";
import image2 from "/startup2.png";
import image3 from "/business.png";
import image4 from "/tech.png";
import image5 from "/economy.png";
import blogdetails from "/blogdetails.png";
import { Link, useParams } from "react-router";
import Heading from "../../commonComponents/Heading";
import JoinTeam from "../../commonComponents/JoinTeam";
import {
  useGetSingleBlogQuery,
  useGetSingleCategoryQuery,
} from "../../../Features/Api/blog.Api";
const BlogDetails = () => {
  const { id } = useParams();
  const singleBlog = useGetSingleBlogQuery(id);
  const blogDescription = singleBlog?.data?.data;

  console.log(" blogdetails", blogDescription);
  const { data, error, isLoading } = useGetSingleCategoryQuery(
    blogDescription?.category
  );
  console.log("relatedBlogs", data);

  const blog = [
    {
      id: 1,
      category: "Startup",
      image: image1,
      title: "Design tips for designers that cover everything you need",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      id: 2,
      category: "Business",
      image: image2,
      title: "How to build a successful business from scratch",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      id: 3,
      category: "Tech",
      image: image3,
      title: "The future of technology and its impact on society",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      id: 4,
      category: "Economy",
      image: image4,
      title: "Understanding the global economy and its challenges",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      id: 5,
      category: "Startup",
      image: image5,
      title: "Innovative startup ideas for aspiring entrepreneurs",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
  ];
  return (
    <>
      <div className="container pt-section_gap mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-8 col-start-3">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img src={author1} alt="author1" />
              </div>
              <div className="">
                <p className="text-gray-600">Alice Johnson</p>
                <p className="text-gray-400 text-sm">
                  <span>Posted On </span>
                  {blogDescription?.createdAt}
                </p>
              </div>
            </div>
            <h1 className="text-5xl leading-16 font-bold mb-4">
              {blogDescription?.title}
            </h1>
            <Link
              to={`/category/${blogDescription?.category?._id}`}
              className="text-sm text-gray-600 uppercase mb-4 inline-block"
            >
              {blogDescription?.category?.name}
            </Link>
          </div>
          <div className="col-span-12 mt-14">
            <div className=" ratio-16x9 max-h-[600px] mb-10 overflow-hidden w-full">
              <img
                src={blogDescription?.image}
                alt="blogdetails"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="col-span-8 col-start-3">
            <p className="text-gray-600 mb-8">{blogDescription?.description}</p>
          </div>
        </div>

        <div className=" mt-20">
          <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-12  gap-6">
            {blog
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="col-span-4 rounded-md p-4 hover:bg-gray-100 transition-all duration-300"
                >
                  <Link to={`/blog/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[200px] object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <JoinTeam />
    </>
  );
};

export default BlogDetails;
