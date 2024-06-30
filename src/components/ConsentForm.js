import React from "react";
import "./styles/DynamicForm.css";
import { CONSENT_FORM } from "../common/constant";

const ConsentForm = (props) => {
  return (
    <>
      <form className="dynamic-form">
        <div>
          <div className="question">
            <h2>{CONSENT_FORM.consentTitle}</h2>
            <p>{CONSENT_FORM.consentText}</p>
            <div className="answer-options">
              <label key={CONSENT_FORM.yes}>
                <input
                  type="radio"
                  value={CONSENT_FORM.yes}
                  checked={props.selectedConsentFormValue === CONSENT_FORM.yes}
                  onChange={() => {
                    props.consentFormValueHandler(CONSENT_FORM.yes);
                  }}
                />
                {CONSENT_FORM.yes}
              </label>
              <label key={CONSENT_FORM.no}>
                <input
                  type="radio"
                  value={CONSENT_FORM.no}
                  onChange={() => {
                    props.consentFormValueHandler(CONSENT_FORM.no);
                  }}
                  checked={props.selectedConsentFormValue === CONSENT_FORM.no}
                />
                {CONSENT_FORM.no}
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ConsentForm;
