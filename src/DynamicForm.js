import React, { useState } from "react";
import "./DynamicForm.css"; // Import CSS file for styling

const DynamicForm = ({ questionnaire }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  return (
    <div className="dynamic-form">
      {questionnaire.Section.Question.map((question) => (
        <div className="question" key={question.$.ID}>
          <p>{question["QuestionText"]}</p>
          {question["AnswerType"] === "Radio Button" && (
            <div className="answer-options">
              {question["AnswerData"].split(",").map((option) => (
                <label key={option.trim()}>
                  <input
                    type="radio"
                    value={option.trim()}
                    checked={answers[question.$.ID] === option.trim()}
                    onChange={() => handleChange(question.$.ID, option.trim())}
                  />
                  {option.trim()}
                </label>
              ))}
            </div>
          )}
          {question["AnswerType"] === "Text" && (
            <input
              className="text-input"
              type="text"
              value={answers[question.$.ID] || ""}
              onChange={(e) => handleChange(question.$.ID, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
