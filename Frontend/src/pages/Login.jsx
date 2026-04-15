import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../utils/apiRequest";
import {
  setCurrentUser,
  setLoading,
  setError,
  clearError,
} from "../features/usersSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    return () => dispatch(clearError());
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(setLoading(true));
    try {
      const response = await apiRequest.post("/user/login", {
        email,
        password,
      });
      dispatch(setCurrentUser(response.data));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message ||
            "Authentication failed. Please check your credentials.",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-slate-500 mt-1 text-sm">Sign in</p>
        </div>

        <div className=" p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-2 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium "
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-2 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium "
                />
              </div>
            </div>

            {error && (
              <span className="text-xs font-medium text-red-700 leading-snug">
                {error}
              </span>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-blue-600   text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 "
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Create New ?{" "}
            <Link to="/register" className="font-semibold text-blue-600 ">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
