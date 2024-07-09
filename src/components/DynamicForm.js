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
    handleCheckBoxChange,
    handleInputChangeForEnvTable,
    homeButtonClickHandler,
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

  const currentSection =
    questionnaire?.Section?.length > 0
      ? questionnaire.Section[currentSectionIndex]
      : questionnaire.Section;
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
                handleCheckBoxChange={handleCheckBoxChange}
                handleInputChangeForEnvTable={handleInputChangeForEnvTable}
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
              handleCheckBoxChange={handleCheckBoxChange}
              handleInputChangeForEnvTable={handleInputChangeForEnvTable}
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
        <div className="homeButton">
          <button
            className="homebtn"
            type="button"
            onClick={homeButtonClickHandler}
          >
            {COMMON.home}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
