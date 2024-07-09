import React from "react";
import "./styles/DynamicForm.css";
import { FORM_CONTENTS, COMMON } from "../common/constant";

const FormContents = (props) => {
  return (
    <>
      <form className="dynamic-form">
        <div>
          <div className="question">
            <div className="answer-options">
              {FORM_CONTENTS.formContents.map((item, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    value={
                      FORM_CONTENTS.formContents[props.selectedFormContentValue]
                    }
                    onChange={() => {
                      props.formContentsValueHandler(index);
                    }}
                    checked={
                      item ===
                      FORM_CONTENTS.formContents[props.selectedFormContentValue]
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <div className="homeButton">
            <button
              className="homebtn"
              type="button"
              onClick={props.handleFormContentNext}
            >
              {COMMON.next}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormContents;
