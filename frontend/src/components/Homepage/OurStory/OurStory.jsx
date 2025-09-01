import React from "react";
import OurstoryImg from "/ourstory.png";
import Button from "../../commonComponents/Button";
import { useGetHighlightBlogQuery } from "../../../Features/Api/blog.Api";
import { Link } from "react-router";
const OurStory = () => {
  const highlight = useGetHighlightBlogQuery();
  const highlightBlog = highlight?.data?.data || [];

  const ourstoryObj = highlightBlog.find((item) => item.slug === "our-story");
  const ourStoryBlog = ourstoryObj?.blog;
  console.log("ourStoryBlog", ourStoryBlog);

  return (
    <>
      <div className="container mx-auto py-section_gap">
        <div className="relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-9 ">
              <div className="">
                <picture>
                  <img
                    src={ourStoryBlog?.image}
                    alt={ourStoryBlog?.title}
                    className="w-full h-full object-fill"
                  />
                </picture>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3/5">
            <div className="p-20 bg-white">
              <h6 className="text-base leading-5 font-semibold uppercase tracking-wide mb-4">
                Why we started
              </h6>
              <h1 className="text-5xl leading-16 font-bold">
                {ourStoryBlog?.title}
              </h1>
              <p className="text-base mt-4 mb-8 text-gray-500">
                {ourStoryBlog?.description}
              </p>

              <Link to={`/blog/${ourStoryBlog?._id}`}>
                <Button
                  buttonText="Discover Our Story"
                  bgColor="bg-yellow-500"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
