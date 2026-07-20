import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Component/Loading";
import UseRole from "../Hooks/useRole";
import Forbidden from "../Component/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = UseRole();
  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
