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
  errorMessage,
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
      <p>{`${question.QuestionSequenceNo}.  ${question["QuestionText"]}`}</p>

      {question["AnswerHelpText"] && (
        <p className="help-text">{question["AnswerHelpText"]}</p>
      )}
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
      {question["AnswerType"] === "checkbox_horizontal" && (
        <div className="answer-options checkbox_horizontal">
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
      {question["AnswerType"] === "Dropdown" && (
        <div className="answer-options">
          <select
            name={`${currentSection.$.title}-${question.$.ID}`}
            value={selectedValues[question.$.ID]}
            onChange={(e) => handleTextChange(question.$.ID, e.target.value)}
          >
            {question["AnswerData"].split(",").map((option) => (
              <option key={option.trim()} value={option.trim()}>
                {option.trim()}
              </option>
            ))}
          </select>
        </div>
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

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Question;
