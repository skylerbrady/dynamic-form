import React from "react";
import "./styles/DynamicForm.css";
import { FORM_CONTENTS } from "../common/constant";

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
                    value={FORM_CONTENTS.formContents[index]}
                    onChange={() => {
                      props.formContentsValueHandler(index);
                    }}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormContents;
