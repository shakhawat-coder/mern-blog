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
  console.log(blogDescription);

  console.log(" blogdetails", blogDescription);
  const categoryId = blogDescription?.category?._id;
  const { data, error, isLoading } = useGetSingleCategoryQuery(categoryId);
  const realtedBlog = data?.data?.blogs?.filter((blog) => blog._id !== id);

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
          {realtedBlog && realtedBlog.length > 0 ? (
            <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          ) : (
            ""
          )}

          <div className="grid grid-cols-12  gap-6">
            {realtedBlog &&
              realtedBlog.map((item) => (
                <div className="col-span-4" key={item._id}>
                  <div className="border border-gray-200 rounded-md shadow-md hover:shadow-xl transition-all duration-300">
                    <Link to={`/blog/${item._id}`} className="">
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={""} className="text-sm text-gray-600 uppercase">
                        {item.category.name}
                      </Link>
                      <Link to={`/blog/${item._id}`}>
                        <Heading
                          title={item.title.slice(0, 20) + "..."}
                          className="text-3xl leading-10 font-bold mt-4"
                        />
                      </Link>
                      <p className="text-sm text-gray-600 mt-2">
                        {item.description.slice(0, 100) + "..."}
                      </p>
                    </div>
                  </div>
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
