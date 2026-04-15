import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import {
  setCurrentUser,
  setCheckingAuth,
  logout,
} from "../features/usersSlice";

const Navbar = () => {
  const { currentUser, isCheckingAuth } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await apiRequest.post("/user/logout");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50 supports-[backdrop-filter:blur(12px)]:bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link to="/">
              <h1 className="text-xl font-bold bg-blue-600 bg-clip-text text-transparent">
                QuizApp
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isCheckingAuth ? null : currentUser ? (
              <>
                <div className="flex items-center space-x-3">
                 
                  <div className="hidden md:block min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {currentUser.user.email}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {currentUser.user.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 md:flex whitespace-nowrap"
                  title="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
