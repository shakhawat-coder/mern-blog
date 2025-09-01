import React from "react";
import { Link, useParams } from "react-router";
import { IoBusiness } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import Heading from "../../commonComponents/Heading";
import AllPost from "../../BlogPage/AllPost/AllPost";
import Category from "../../commonComponents/Category";
import { useGetSingleCategoryQuery } from "../../../Features/Api/blog.Api";

const CategoryBlog = () => {
  //   const categories = [
  //     {
  //       id: 1,
  //       name: "Business",
  //       description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  //       icon: (
  //         <IoBusiness className="text-5xl mb-4 bg-light_yellow p-2 rounded-sm" />
  //       ),
  //     },
  //     {
  //       id: 2,
  //       name: "Tech",
  //       description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  //       icon: (
  //         <GrTechnology className="text-5xl mb-4 bg-light_yellow p-2 rounded-sm" />
  //       ),
  //     },
  //     {
  //       id: 3,
  //       name: "Finance",
  //       description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  //       icon: (
  //         <BsGraphUpArrow className="text-5xl mb-4 bg-light_yellow p-2 rounded-sm" />
  //       ),
  //     },
  //     {
  //       id: 4,
  //       name: "Startup",
  //       description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  //       icon: (
  //         <IoRocketOutline className="text-5xl mb-4 bg-light_yellow p-2 rounded-sm" />
  //       ),
  //     },
  //   ];
  const { id } = useParams();

  //   const categoryId = parseInt(id);
  //   const selectedCategory = categories.find((cat) => cat.id === categoryId);

  //   if (!selectedCategory) {
  //     return <div>Category not found</div>;
  //   }
  const { data, error, isLoading } = useGetSingleCategoryQuery(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  //   console.log(data);
  const selectedCategory = data?.data;
  const selectedCategoryBlogs = selectedCategory?.blogs || [];
  console.log("selectedCategoryblogs:", selectedCategoryBlogs);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container py-section_gap">
          <div className="flex flex-col items-center justify-center max-w-1/3 mx-auto ">
            <Heading
              title={selectedCategory.name}
              className="text-center mb-4"
            />
            <p className="text-center pb-5">{selectedCategory.description}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8">
            {selectedCategoryBlogs && selectedCategoryBlogs.length > 0 ? (
              selectedCategoryBlogs.map((item) => (
                <div className="" key={item._id}>
                  <div className="border flex hover:bg-gray-100 transition-all duration-300 items-center border-gray-200 rounded-md">
                    <Link to={`/blog/${item._id}`} className="">
                      <div className="w-[490px] h-[300px] overflow-hidden">
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
                          title={item.title.slice(0, 50) + "..."}
                          className={"py-4"}
                        />
                      </Link>
                      <p className="text-sm text-gray-600">
                        {item.description.slice(0, 150) + "..."}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No blogs found in this category.</p>
            )}
          </div>
          <div className="col-span-4">
            <Category catGrid="grid-cols-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBlog;
