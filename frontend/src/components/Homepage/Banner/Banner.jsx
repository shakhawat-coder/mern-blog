import React from "react";
import { Link } from "react-router";
import Button from "../../commonComponents/Button";
import { useGetHighlightBlogQuery } from "../../../Features/Api/blog.Api";

const Banner = () => {
  const highlight = useGetHighlightBlogQuery();
  const highlightBlogArray = highlight?.data?.data || [];

  // Find the banner-blog object
  const bannerObj = highlightBlogArray.find(
    (item) => item.slug === "banner-blog"
  );
  const bannerData = bannerObj?.blog;

  console.log("Banner Blog Data:", bannerData);

  return (
    <>
      <div
        className=" relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerData?.image[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "85vh",
        }}
      >
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3xl">
            <h6 className="text-base text-white">
              Posted on{" "}
              <b>
                <Link
                  to={`/category/${bannerData?.category._id}`}
                  className="text-yellow-500"
                >
                  {bannerData?.category.name}
                </Link>
              </b>{" "}
            </h6>
            <h1 className=" text-5xl text-white font-bold py-6 leading-tight">
              {bannerData?.title}
            </h1>
            <p className="text-base text-white">
              By{" "}
              <Link to={""} className="text-yellow-500">
                John Doe
              </Link>{" "}
              | <em>May 1, 2025</em>
            </p>
            <p className="text-base text-white pt-4 pb-12">
              {bannerData?.description}
            </p>
            <Link to={`/blog/${bannerData?._id}`}>
              <Button buttonText="Read More" bgColor="bg-yellow-300" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
