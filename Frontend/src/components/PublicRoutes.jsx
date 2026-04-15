import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PublicRoutes = ({ children }) => {
  const { currentUser, isCheckingAuth } = useSelector((state) => state.users);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return currentUser ? <Navigate to="/"  /> : children;
};

export default PublicRoutes;
