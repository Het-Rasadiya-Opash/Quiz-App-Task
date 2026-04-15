import React, { useState } from "react";
import { useSelector } from "react-redux";
import apiRequest from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";

const CreateQuizForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const [title, setTitle] = useState("");
  const [timeLimitSec, setTimeLimitSec] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleQuizForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await apiRequest.post("/quiz/create", { title, timeLimitSec });
      setSuccess(true);
      setTitle("");
      setTimeLimitSec("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md  p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Create Quiz</h2>
        </div>

        <form onSubmit={handleQuizForm} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Quiz Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
                required
                className="w-full pl-2 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium "
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Time Limit (seconds)
            </label>
            <div className="relative">
              <input
                type="number"
                value={timeLimitSec}
                onChange={(e) => setTimeLimitSec(e.target.value)}
                placeholder="e.g. 300"
                min={0}
                className="w-full pl-2 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium "
              />
            </div>
          </div>

          {error && (
            <span className="text-xs font-medium text-red-700 leading-snug">
              {error}
            </span>
          )}

          {success && (
            <span className="text-xs font-medium text-green-700">
              Quiz created successfully!
            </span>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizForm;
