import React from "react";
import "./styles/DynamicForm.css";
import Table from "./EnvironmentTable";
import MultiSelectBox from "./MultiSelectBox";

const Question = ({
  question,
  handleRadioChange,
  handleTextChange,
  selectedValues,
  currentSection,
}) => (
  <div className="question" key={`${currentSection.$.title}-${question.$.ID}`}>
    <p>{question["QuestionText"]}</p>
    {question["AnswerType"] === "Radio Button" && (
      <div className="answer-options">
        {question["AnswerData"].split(",").map((option) => (
          <label key={option.trim()}>
            <input
              type="radio"
              name={`${currentSection.$.title}-${question.$.ID}`}
              value={option.trim()}
              checked={
                selectedValues[currentSection.$.title]?.[question.$.ID] ===
                option.trim()
              }
              onChange={() =>
                handleRadioChange(
                  currentSection.$.title,
                  question.$.ID,
                  option.trim()
                )
              }
            />
            {option.trim()}
          </label>
        ))}
      </div>
    )}

    {question["AnswerType"] === "checkbox" && (
      <div className="answer-options">
        {question["AnswerData"].split(",").map((option) => (
          <label key={option.trim()}>
            <input
              type="checkbox"
              name={`${currentSection.$.title}-${question.$.ID}`}
              value={option.trim()}
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
        name={`${currentSection.$.title}-${question.$.ID}`}
        value={selectedValues[currentSection.$.title]?.[question.$.ID]}
        onChange={(e) =>
          handleTextChange(
            currentSection.$.title,
            question.$.ID,
            e.target.value
          )
        }
      />
    )}
    {question["AnswerType"] === "Table_Env" && <Table tableData={question} />}
    {question["AnswerType"] === "MultiSelectBox" && (
      <MultiSelectBox question={question} />
    )}
  </div>
);

export default Question;
