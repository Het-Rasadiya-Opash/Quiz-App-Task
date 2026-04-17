import React, { useState } from "react";
import apiRequest from "../utils/apiRequest";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, HelpCircle } from "lucide-react";

const LABELS = ["A", "B", "C", "D"];

const CreateQuestionForm = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiRequest.post(`/question/create/${quizId}`, {
        text,
        options,
        correctIndex,
      });
      navigate(`/quiz/${quizId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-sm p-8">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add Question</h2>
            <p className="text-xs text-slate-500">Fill in the question and 4 options</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Question Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your question"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Options
            </label>
            <div className="space-y-2">
              {options.map((option, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-bold shrink-0">
                    {LABELS[i]}
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Correct Answer
            </label>
            <select
              value={correctIndex}
              onChange={(e) => setCorrectIndex(e.target.value === "" ? "" : Number(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
            >
              <option value="">Select correct option</option>
              {options.map((option, i) => (
                <option key={i} value={i}>
                  {LABELS[i]}. {option || `Option ${i + 1}`}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-xs font-medium text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 className="animate-spin w-4 h-4" /> Creating...</>
            ) : (
              "Create Question"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestionForm;
