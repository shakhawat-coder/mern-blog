import React from "react";
import Sidebar from "./dashboardComponents/Sidebar/Sidebar";
import { Outlet } from "react-router";
import { useGetLoggedInUserQuery } from "../Features/Api/blog.Api";

const DashboardRootLayout = () => {
  const { data, error, isLoading } = useGetLoggedInUserQuery();
  const userdata = data?.data;
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Section */}
      <Sidebar userdata={userdata} />
      {/* Main Content Section */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet userdata={userdata} />
      </div>
    </div>
  );
};

export default DashboardRootLayout;
