import React from "react";
import Heading from "./Heading";
import { IoBusiness } from "react-icons/io5";
import { IoRocketOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";
import { Link } from "react-router";
import { useGetAllCategoryQuery } from "../../Features/Api/dashboard.api";
const Category = ({
  title = "Choose Categories",
  className = "py-section_gap",
  catGrid = "grid-cols-4",
  limit = 4,
}) => {
  const allCategory = useGetAllCategoryQuery();
  console.log(allCategory?.data?.data);

  return (
    <>
      <div className={`container mx-auto ${className}`}>
        <Heading title={title} className="text-center mb-10" />
        <div className={`grid ${catGrid} gap-4`}>
          {allCategory?.data?.data.slice(0, limit).map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="border border-gray-200 p-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 hover:cursor-pointer"
            >
              <img
                src={category.image[0]}
                alt={category.name}
                className="w-14 h-14 bg-white rounded-sm p-2 mb-4"
              />

              <h3 className="text-3xl leading-10 font-bold mb-4">
                {category.name}
              </h3>
              <p className="text-gray-600 text-base leading-6">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
