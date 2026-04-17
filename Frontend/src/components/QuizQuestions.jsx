import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import { useSelector } from "react-redux";
import { Loader2, Trophy, Clock, CheckCircle2 } from "lucide-react";

const LABELS = ["A", "B", "C", "D"];

const QuizQuestions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [selected, setSelected] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const timerRef = useRef(null);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    const start = async () => {
      setLoading(true);
      try {
        const res = await apiRequest.post(`/quiz/${quizId}/start`);
        const { attemptId: aId, quiz: q, questions: qs } = res.data.data;
        setAttemptId(aId);
        setQuiz(q);
        setQuestions(qs);
        if (q.timeLimitSec) setTimeLeft(q.timeLimitSec);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to start quiz.");
      } finally {
        setLoading(false);
      }
    };
    start();
  }, [quizId]);

  const handleSubmit = useCallback(async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    clearInterval(timerRef.current);
    setSubmitting(true);
    try {
      const answers = questions.map((q) => ({
        questionId: q._id,
        selectedIndex: selected[q._id] ?? -1,
      }));
      const res = await apiRequest.post(`/attempts/${attemptId}/submit`, {
        answers,
      });
      setResult(res.data.data);
      const lb = await apiRequest.get(`/quiz/${quizId}/leaderboard`);
      setLeaderboard(lb.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  }, [attemptId, questions, selected, quizId]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timeLeft === null ? null : "started", handleSubmit]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );

  if (result) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              Quiz Completed!
            </h2>
            <p className="text-slate-500 text-sm mb-4">Here's how you did</p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg">
              {result.score} / {result.total}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="text-base font-bold text-slate-900">
                Leaderboard
              </h3>
            </div>

            {leaderboard.length === 0 ? (
              <p className="text-slate-400 text-sm">No entries yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 text-slate-500 font-semibold">
                      #
                    </th>
                    <th className="text-left py-2 px-3 text-slate-500 font-semibold">
                      Email
                    </th>
                    <th className="text-left py-2 px-3 text-slate-500 font-semibold">
                      Score
                    </th>
                    <th className="text-left py-2 px-3 text-slate-500 font-semibold">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                    >
                      <td className="py-2 px-3 font-bold text-slate-700">
                        {i === 0 ? "1" : i === 1 ? "2" : i === 2 ? "3" : i + 1}
                      </td>
                      <td className="py-2 px-3 text-slate-700">
                        {entry.email}
                      </td>
                      <td className="py-2 px-3 font-semibold text-blue-600">
                        {entry.score}
                      </td>
                      <td className="py-2 px-3 text-slate-500">
                        {(entry.timeTaken / 1000).toFixed(1)}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">{quiz?.title}</h2>
          <div className="flex items-center gap-3">
           
            {timeLeft !== null && (
              <span
                className={`flex items-center gap-1.5 font-bold text-sm px-3 py-1.5 rounded-full border ${
                  timeLeft <= 10
                    ? "text-red-600 bg-red-50 border-red-200 animate-pulse"
                    : "text-slate-700 bg-white border-slate-200"
                }`}
              >
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </div>

        {questions.length === 0 ? (
          <p className="text-center text-slate-400 mt-20">
            No questions available.
          </p>
        ) : (
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
              >
                <p className="font-semibold text-slate-900 mb-4">
                  {index + 1}. {question.text}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, i) => {
                    const isSelected = selected[question._id] === i;
                    return (
                      <button
                        key={i}
                        onClick={() =>
                          setSelected((prev) => ({
                            ...prev,
                            [question._id]: i,
                          }))
                        }
                        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {LABELS[i]}
                        </span>
                        {option}
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 ml-auto text-blue-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Submitting...
                </>
              ) : (
                `Submit (${Object.keys(selected).length}/${questions.length} answered)`
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestions;
