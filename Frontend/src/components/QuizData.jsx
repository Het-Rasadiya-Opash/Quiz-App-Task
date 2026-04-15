import React from "react";
import { useSelector } from "react-redux";

const QuizData = ({ quiz }) => {
  const { currentUser } = useSelector((state) => state.users);

  const minutes = quiz.timeLimitSec ? Math.floor(quiz.timeLimitSec / 60) : null;
  const seconds = quiz.timeLimitSec ? quiz.timeLimitSec % 60 : null;

  return (
    <div className="bg-white border   p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-slate-900 ">
          {quiz.title}
        </h3>
        {currentUser.user.role === "admin" && (
          <>
            <button className=" text-xs font-semibold px-2.5 py-1  text-amber-600 ">
              edit
            </button>
            <button className=" text-xs font-semibold px-2.5 py-1  text-red-600 ">
              Delete
            </button>
          </>
        )}
        <span className=" text-xs font-semibold px-2.5 py-1  text-blue-600 ">
          {quiz.createdBy?.role}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {quiz.timeLimitSec ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            Time -
            <span>
              {minutes > 0 && `${minutes}m `}
              {seconds > 0 && `${seconds}s`}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>No time limit</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-500 text-sm">
          CreatedBy -<span className="truncate">{quiz.createdBy?.email}</span>
        </div>
      </div>

      <button className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600  text-white text-sm font-semibold rounded-xl ">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizData;
