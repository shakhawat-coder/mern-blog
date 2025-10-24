import React, { useState } from "react";
import Heading from "../../commonComponents/Heading";
import { Link } from "react-router";
import { useGetAllBlogQuery } from "../../../Features/Api/blog.Api";
import { truncateText } from "../../../utilities/truncate";
const AllPost = () => {
  const { data, isLoading, error } = useGetAllBlogQuery();
  const blog = data?.data || [];
  // console.log(blog);
  const shortedBlogs = [...blog].reverse();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(shortedBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = shortedBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container mx-auto py-section_gap">
        <div className="grid grid-cols-1 gap-6">
          {currentItems.map((item) => (
            <div key={item._id}>
              <div className="border flex hover:bg-gray-100 transition-all duration-300 items-center border-gray-200 rounded-md">
                <Link to={`/blog/${item._id}`} className="">
                  <div className="w-[490px] h-[300px] overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link
                    to={`/category/${item?.category?._id}`}
                    className="text-sm text-gray-600 uppercase"
                  >
                    {item?.category?.name}
                  </Link>
                  <Link to={`/blog/${item._id}`}>
                    <Heading title={item.title} className={"py-4"} />
                  </Link>
                  <p className="text-sm text-gray-600">
                    {truncateText(item.description, 350)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===========pagination=========== */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          {/* <span>
                        Page {currentPage} of {totalPages}
                    </span> */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllPost;
