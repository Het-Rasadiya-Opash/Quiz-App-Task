import React from "react";

const QuizData = ({ quiz }) => {
  const minutes = quiz.timeLimitSec ? Math.floor(quiz.timeLimitSec / 60) : null;
  const seconds = quiz.timeLimitSec ? quiz.timeLimitSec % 60 : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-slate-900 leading-snug">{quiz.title}</h3>
        <span className="shrink-0 text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 ">
          {quiz.createdBy?.role || "—"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {quiz.timeLimitSec ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            Time -
            <span>
              {minutes > 0 && `${minutes}m `}{seconds > 0 && `${seconds}s`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>No time limit</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-500 text-sm">
          CreatedBy -
          <span className="truncate">{quiz.createdBy?.email || "Unknown"}</span>
        </div>
      </div>

      <button className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl active:scale-95 transition-all duration-200 shadow-sm shadow-blue-500/20">
      
        Start Quiz
      </button>
    </div>
  );
};

export default QuizData;
