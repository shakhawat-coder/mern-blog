import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";
import { MyBlogApi } from "../../../Features/Api/blog.Api";
import { useGetLogoutUserMutation } from "../../../Features/Api/blog.Api";
import Button from "../../../components/commonComponents/Button";
import { useDispatch } from "react-redux";

const Sidebar = ({ userdata }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logout, { data, error }] = useGetLogoutUserMutation();

  // Define all dropdown menus dynamically
  const dropdownMenus = [
    {
      id: "dashboard",
      label: "Dashboard",
      to: "/dashboard",
      end: true,
      icon: <AiOutlineDashboard />,
      type: "link",
    },
    {
      id: "categories",
      label: "Categories",
      type: "dropdown",
      items: [
        { label: "Add Category", to: "/dashboard/add-category" },
        { label: "All Categories", to: "/dashboard/categories" },
      ],
      activePaths: ["/dashboard/categories", "/dashboard/add-category"],
    },
    {
      id: "blogs",
      label: "Blogs",
      type: "dropdown",
      items: [
        { label: "Add Blog", to: "/dashboard/add-blog" },
        { label: "All Blogs", to: "/dashboard/all-blog" },
      ],
      activePaths: ["/dashboard/all-blog", "/dashboard/add-blog"],
    },
    {
      id: "products",
      label: "Products",
      type: "dropdown",
      items: [
        { label: "Add Product", to: "/dashboard/add-product" },
        { label: "All Products", to: "/dashboard/products" },
        { label: "Product Reviews", to: "/dashboard/product-reviews" },
      ],
      activePaths: [
        "/dashboard/products",
        "/dashboard/add-product",
        "/dashboard/product-reviews",
      ],
    },
    // You can add more dropdowns here easily
  ];

  // Check if any dropdown item is active and open the dropdown accordingly
  useEffect(() => {
    const path = location.pathname;

    // Find which dropdown should be open based on current path
    const activeDropdown = dropdownMenus.find(
      (menu) =>
        menu.type === "dropdown" &&
        menu.activePaths.some((activePath) => path.includes(activePath))
    );

    setOpenDropdown(activeDropdown ? activeDropdown.id : null);
  }, [location.pathname]);

  const toggleDropdown = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const isDropdownActive = (activePaths) => {
    return activePaths.some((path) => location.pathname.includes(path));
  };

  const renderMenuItems = () => {
    return dropdownMenus.map((menu) => {
      if (menu.type === "link") {
        return (
          <li key={menu.id}>
            <NavLink
              to={menu.to}
              end={menu.end}
              className={({ isActive }) =>
                `flex items-center text-lg gap-2 p-2 rounded transition ${
                  isActive ? "bg-blue-400 text-white" : "hover:bg-gray-100"
                }`
              }
            >
              {menu.icon} {menu.label}
            </NavLink>
          </li>
        );
      }

      if (menu.type === "dropdown") {
        return (
          <li key={menu.id}>
            <div
              onClick={() => toggleDropdown(menu.id)}
              className={`flex items-center justify-between p-2 rounded cursor-pointer transition ${
                isDropdownActive(menu.activePaths)
                  ? "bg-blue-400 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{menu.label}</span>
              <span
                className={`transition-transform duration-200 ${
                  openDropdown === menu.id ? "rotate-90" : ""
                }`}
              >
                <FaChevronRight />
              </span>
            </div>

            {openDropdown === menu.id && (
              <ul className="mt-2 ml-4 space-y-2">
                {menu.items.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block p-2 rounded transition ${
                          isActive
                            ? "bg-blue-400 text-white"
                            : "hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      }

      return null;
    });
  };
  const handleLogout = async () => {
    console.log("logout");

    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      dispatch(MyBlogApi.util.resetApiState());
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="w-64 h-screen border-r border-gray-200 p-4">
      {/* Profile */}
      <div className="h-20 w-20 mx-auto rounded-full overflow-hidden">
        <img
          src={userdata?.profilePic}
          alt={userdata?.name}
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{userdata?.name}</h2>

      {/* Menu */}
      <ul className="flex flex-col gap-1">{renderMenuItems()}</ul>

      {/* Logout Button */}
      {/* <Button buttonText="Logout" widht="w-full" onClick={handleLogout} /> */}
      <button
        className="px-12 mt-5 flex items-center gap-2 border py-3 bg-white w-full text-black font-bold cursor-pointer"
        onClick={handleLogout}
      >
        <CiLogout className="text-4xl" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
