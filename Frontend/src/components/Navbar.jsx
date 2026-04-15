import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Menu } from "lucide-react";
import apiRequest from "../utils/apiRequest";

const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await apiRequest.post("/user/logout");
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50 supports-[backdrop-filter:blur(12px)]:bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuizApp
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/50">
                <User className="w-5 h-5 text-white" />
              </div>
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
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
