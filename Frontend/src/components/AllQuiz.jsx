import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiRequest from "../utils/apiRequest";
import QuizData from "./QuizData";
import { Link } from "react-router-dom";

const AllQuiz = () => {
  const { currentUser } = useSelector((state) => state.users);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiRequest.get("/quiz");
        setQuizzes(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch quizzes.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllQuiz();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Quizzes</h2>
        </div>
        {currentUser?.user?.role === "admin" && (
          <Link to="/create-quiz">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600  text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/25 ">
              Create Quiz
            </button>
          </Link>
        )}
      </div>

      {quizzes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <p className="text-sm font-medium">No quizzes available yet</p>
        </div>
      )}

      {quizzes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizData key={quiz._id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllQuiz;
