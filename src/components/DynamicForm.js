import React, { useState } from "react";
import { COMMON } from "../common/constant";
import "./styles/DynamicForm.css";
import Question from "../components/Question";

const DynamicForm = (props) => {
  const {
    questionnaire,
    handleRadioChange,
    handleTextChange,
    selectedValues,
    handleSaveButton,
  } = props;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const nextSection = () => {
    if (currentSectionIndex < questionnaire.Section.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const currentSection = questionnaire.Section[currentSectionIndex];

  // const Question = ({ question }) => (
  //   <div
  //     className="question"
  //     key={`${currentSection.$.title}-${question.$.ID}`}
  //   >
  //     <p>{question["QuestionText"]}</p>
  //     {question["AnswerType"] === "Radio Button" && (
  //       <div className="answer-options">
  //         {question["AnswerData"].split(",").map((option) => (
  //           <label key={option.trim()}>
  //             <input
  //               type="radio"
  //               name={`${currentSection.$.title}-${question.$.ID}`}
  //               value={option.trim()}
  //               checked={
  //                 selectedValues[currentSection.$.title]?.[question.$.ID] ===
  //                 option.trim()
  //               }
  //               onChange={() =>
  //                 handleRadioChange(
  //                   currentSection.$.title,
  //                   question.$.ID,
  //                   option.trim()
  //                 )
  //               }
  //             />
  //             {option.trim()}
  //           </label>
  //         ))}
  //       </div>
  //     )}
  //     {question["AnswerType"] === "Text" && (
  //       <input
  //         className="text-input"
  //         type="text"
  //         name={`${currentSection.$.title}-${question.$.ID}`}
  //         value={selectedValues[currentSection.$.title]?.[question.$.ID]}
  //         onChange={(e) =>
  //           handleTextChange(
  //             currentSection.$.title,
  //             question.$.ID,
  //             e.target.value
  //           )
  //         }
  //       />
  //     )}
  //     {question["AnswerType"] === "Table_Env" && <Table tableData={question} />}
  //   </div>
  // );
  return (
    <div className="dynamicWrapper">
      <form className="dynamic-form" action="javascript:void(0);">
        <div>
          {currentSection && currentSection.Question.length > 0 ? (
            currentSection.Question.map((question) => (
              <Question
                key={question.$.ID}
                question={question}
                handleRadioChange={handleRadioChange}
                handleTextChange={handleTextChange}
                selectedValues={selectedValues}
                currentSection={currentSection}
              />
            ))
          ) : (
            <Question
              key={currentSection.Question.$.ID}
              question={currentSection.Question}
              handleRadioChange={handleRadioChange}
              handleTextChange={handleTextChange}
              selectedValues={selectedValues}
              currentSection={currentSection}
            />
          )}
        </div>
        <div className="navigation-buttons">
          <button
            type="button"
            onClick={prevSection}
            disabled={currentSectionIndex === 0}
          >
            {COMMON.previous}
          </button>
          <button onClick={handleSaveButton}>{COMMON.save}</button>
          <button
            type="button"
            onClick={nextSection}
            disabled={currentSectionIndex === questionnaire.Section.length - 1}
          >
            {COMMON.next}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
