import React, { useState } from "react";
import apiRequest from "../utils/apiRequest";
import { useParams, useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px" }}>
      <h2>Create Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text</label>
          <br />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter question"
            required
            style={{ width: "100%", marginTop: 4 }}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <label>Options</label>
          {options.map((option, i) => (
            <div key={i} style={{ marginTop: 6 }}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                required
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <label>Correct Answer</label>
          <br />
          <select
            value={correctIndex}
            onChange={(e) => setCorrectIndex(e.target.value === "" ? "" : Number(e.target.value))}
            required
            style={{ marginTop: 4 }}
          >
            <option value="">Select correct option</option>
            {options.map((option, i) => (
              <option key={i} value={i}>
                {i + 1}. {option || `Option ${i + 1}`}
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "Creating..." : "Create Question"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
