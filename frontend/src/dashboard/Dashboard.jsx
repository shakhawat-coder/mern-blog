import React from "react";
import { useGetLoggedInUserQuery } from "../Features/Api/blog.Api";

const Dashboard = () => {
  const { data, error, isLoading } = useGetLoggedInUserQuery();
  console.log(data);

  return <div>Dashboard</div>;
};

export default Dashboard;
