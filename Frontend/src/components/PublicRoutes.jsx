import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { currentUser, isCheckingAuth } = useSelector((state) => state.users);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading
      </div>
    );
  }

  return currentUser ? <Navigate to="/"  /> : children;
};

export default PublicRoutes;
