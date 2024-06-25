import React, { useState } from "react";
import Table from "./Table";
import "./DynamicForm.css";

const DynamicForm = ({ questionnaire }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const Question = ({ question }) => (
    <div className="question" key={question.$.ID}>
      <p>{question["QuestionText"]}</p>
      {question["AnswerType"] === "Radio Button" && (
        <div className="answer-options">
          {question["AnswerData"].split(",").map((option) => (
            <label key={option.trim()}>
              <input type="radio" />
              {option.trim()}
            </label>
          ))}
        </div>
      )}
      {question["AnswerType"] === "Text" && (
        <input className="text-input" type="text" />
      )}
      {question["AnswerType"] === "Table" && <Table tableData={question} />}
    </div>
  );
  return (
    <>
      <div className="tab-headers">
        {questionnaire.Section.map((section, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={activeTab === index ? "active" : ""}
          >
            {section.$.title}
          </button>
        ))}
      </div>

      <form className="dynamic-form">
        {questionnaire.Section.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            style={{ display: activeTab === sectionIndex ? "block" : "none" }}
          >
            {section.Question.length > 0 ? (
              section.Question.map((question) => (
                <Question question={question} />
              ))
            ) : (
              <Question question={section.Question} />
            )}
          </div>
        ))}
      </form>
    </>
  );
};

export default DynamicForm;
