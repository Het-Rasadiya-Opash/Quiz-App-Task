import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../utils/apiRequest";

const QuizQuestions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiRequest.get(`/question/${quizId}`);
        setQuestions(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  if (loading)
    return <p className="text-center mt-20 text-slate-500">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="text-sm  mb-6 block">
        ← Back
      </button>

      {questions.length === 0 ? (
        <p className="text-center text-slate-400 mt-20">
          No questions available.
        </p>
      ) : (
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question._id}>
              <p className="font-semibold text-slate-800 mb-3">
                {index + 1}. {question.text}
              </p>
              <div className="space-y-2">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [question._id]: i }))
                    }
                    className={`w-full text-left px-4 py-2.5  border text-sm  ${
                      selected[question._id] === i
                        ? " font-medium"
                        : "border-slate-200 text-slate-700 "
                    }`}
                  >
                    {i + 1}. {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button className="w-full py-3 bg-blue-600  text-white font-semibold text-sm">
            answer
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
