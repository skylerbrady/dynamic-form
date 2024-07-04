import React from "react";
import "./styles/DynamicForm.css";
import EnvironmentTable from "./EnvironmentTable";
import MultiSelectBox from "./MultiSelectBox";

const Question = ({
  question,
  handleRadioChange,
  handleTextChange,
  selectedValues,
  currentSection,
  handleCheckBoxChange,
  handleInputChangeForEnvTable,
}) => {
  const getCheckBoxValue = (option) => {
    let item = selectedValues[question.$.ID]?.split(",");
    let index = item?.findIndex((val) => val === option);
    return index >= 0;
  };
  return (
    <div
      className="question"
      key={`${currentSection.$.title}-${question.$.ID}`}
    >
      <p>{question["QuestionText"]}</p>
      {question["AnswerType"] === "Radio Button" && (
        <div className="answer-options">
          {question["AnswerData"].split(",").map((option) => (
            <label key={option.trim()}>
              <input
                type="radio"
                name={`${currentSection.$.title}-${question.$.ID}`}
                value={option.trim()}
                checked={selectedValues[question.$.ID] === option.trim()}
                onChange={() => handleRadioChange(question.$.ID, option.trim())}
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
                checked={getCheckBoxValue(option.trim())}
                onChange={(e) =>
                  handleCheckBoxChange(
                    question.$.ID,
                    e.target.checked,
                    option.trim()
                  )
                }
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
          value={selectedValues[question.$.ID]}
          onChange={(e) => handleTextChange(question.$.ID, e.target.value)}
        />
      )}
      {question["AnswerType"] === "Table_Env" && (
        <EnvironmentTable
          question={question}
          handleInputChangeForEnvTable={handleInputChangeForEnvTable}
          selectedValues={selectedValues}
        />
      )}
      {question["AnswerType"] === "MultiSelectBox" && (
        <MultiSelectBox
          question={question}
          handleCheckBoxChange={handleCheckBoxChange}
          selectedValues={selectedValues}
        />
      )}
    </div>
  );
};

export default Question;
