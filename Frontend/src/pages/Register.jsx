import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../../PostgreSQL/PERN-Project/frontend/src/utils/apiRequest";
import {
  setCurrentUser,
  setLoading,
  setError,
  clearError,
} from "../features/usersSlice";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.users);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(setLoading(true));
    try {
      const response = await apiRequest.post("/user/register", {
        email,
        password,
      });

      dispatch(
        setCurrentUser({
          id: response.data.user._id,
          email: response.data.user.email,
          role: response.data.user.role,
        }),
      );
      setEmail("");
      setPassword("");
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
    <>
      <div className="">
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-3.5 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
              <Lock className="text-red-500 w-4 h-4 shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-red-700 leading-snug">
                {error}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Register...</span>
              </>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
