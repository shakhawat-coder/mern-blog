import React from "react";
import { Link, useParams } from "react-router";
import Heading from "../../commonComponents/Heading";
import JoinTeam from "../../commonComponents/JoinTeam";
import {
  useGetSingleBlogQuery,
  useGetSingleCategoryQuery,
  useGetSingleUserQuery,
} from "../../../Features/Api/blog.Api";
import { truncateText } from "../../../utilities/truncate";
const BlogDetails = () => {
  const { id } = useParams();
  const singleBlog = useGetSingleBlogQuery(id);
  const blogDescription = singleBlog?.data?.data;

  const categoryId = blogDescription?.category?._id;
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useGetSingleCategoryQuery(categoryId, { skip: !categoryId });
  const realtedBlog = categoryData?.data?.blogs?.filter(
    (blog) => blog._id !== id
  );
  const {
    data: authorInfo,
    error: authorError,
    isLoading: authorIsLoading,
  } = useGetSingleUserQuery(blogDescription?.author, {
    skip: !blogDescription?.author,
  });
  const authorInformation = authorInfo?.data;
  // console.log(authorInformation);

  return (
    <>
      <div className="container pt-section_gap mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-8 col-start-3">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src={authorInformation?.profilePic}
                  alt={authorInformation?.name}
                />
              </div>
              <div className="">
                <Link
                  to={`/author/${authorInformation?._id}`}
                  className="text-gray-600"
                >
                  {authorInformation?.name}
                </Link>
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
            <div
              className="text-gray-600 mb-8 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogDescription?.description }}
            ></div>
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
                <div className="col-span-4">
                  <div className="h-full flex flex-col border border-gray-200 rounded-md shadow-md hover:shadow-xl transition-all duration-300">
                    <Link to={`/blog/${item._id}`} className="block">
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col flex-grow">
                      <Link to={""} className="text-sm text-gray-600 uppercase">
                        {item.category.name}
                      </Link>
                      <Link to={`/blog/${item._id}`}>
                        <Heading
                          title={truncateText(item.title, 30)}
                          className="text-3xl leading-10 font-bold mt-4"
                        />
                      </Link>
                      <p className="text-sm text-gray-600 mt-2 flex-grow">
                        {truncateText(item.description, 100)}
                      </p>
                      <div className="mt-auto pt-4">
                        {/* optional: footer, date, or button */}
                      </div>
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
