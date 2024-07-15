import React, { useState, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import { fetchXmlData } from "../common/commonHelpers";
import ConsentForm from "../components/ConsentForm";
import FormContents from "../components/FormContents";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest, msalInstance } from "../authConfig";

const App = () => {
  const [xmlData, setXmlData] = useState(null);
  const [selectedConsentFormValue, setSelectedConsentFormValue] = useState("");
  const [selectedFormContentValue, setSelectedFormContentValue] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [showFormsContent, setShowFormContent] = useState(false);
  const [formContentValue, setFormContentValue] = useState("");

  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  useEffect(() => {
    msalInstance.initialize();
    if (!isAuthenticated) {
      authenticated();
    }
  }, [isAuthenticated, instance]);

  const authenticated = async () => {
    await msalInstance.initialize();
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error("MSAL login error", e);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchXmlData(formContentValue);
        setXmlData(data.questionnaire ? data.questionnaire : null);
      } catch (error) {
        console.error("Error fetching or parsing XML data");
      }
    };

    fetchData();
  }, [formContentValue]);

  const consentFormValueHandler = (value) => {
    setSelectedConsentFormValue(value);
    value === "Yes" && setShowFormContent(true);
  };

  const formContentsValueHandler = (value) => {
    setSelectedFormContentValue(value);
  };
  const handleRadioChange = (questionId, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionId]: value,
    }));
  };

  const handleTextChange = (questionId, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionId]: value,
    }));
  };

  const handleSaveButton = () => {
    let createFormData = {
      [selectedFormContentValue]: [selectedValues],
    };
    console.log(selectedValues);
  };

  const handleCheckBoxChange = (questionId, isChecked, value) => {
    let checkBoxVal = selectedValues[questionId]
      ? selectedValues[questionId].split(",")
      : [];

    if (isChecked) {
      !checkBoxVal.includes(value) && checkBoxVal.push(value);
    } else {
      let index =
        checkBoxVal && checkBoxVal.findIndex((item) => item === value);
      if (index >= 0) {
        checkBoxVal.splice(index, 1);
      }
    }
    setSelectedValue(checkBoxVal);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionId]: checkBoxVal.toString(),
    }));
  };

  // Handle onChange event for inputs
  const handleInputChangeForEnvTable = (
    question,
    event,
    rowIndex,
    cellIndex
  ) => {
    const { name, value } = event.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [question]: { [`${rowIndex}-${cellIndex}`]: value },
    }));
  };

  const homeButtonClickHandler = () => {
    setShowFormContent(true);
  };
  const handleFormContentNext = () => {
    setFormContentValue(selectedFormContentValue);
    setShowFormContent(false);
  };
  return (
    <>
      {!xmlData && formContentValue !== "" ? (
        <div>Error fetching or parsing XML data</div>
      ) : (
        <div className="app">
          {(selectedConsentFormValue === "" ||
            selectedConsentFormValue === "No") && (
            <ConsentForm
              consentFormValueHandler={consentFormValueHandler}
              selectedConsentFormValue={selectedConsentFormValue}
            />
          )}
          {showFormsContent && (
            <FormContents
              formContentsValueHandler={formContentsValueHandler}
              selectedFormContentValue={selectedFormContentValue}
              handleFormContentNext={handleFormContentNext}
            />
          )}
          {!showFormsContent &&
            selectedConsentFormValue === "Yes" &&
            formContentValue !== "" && (
              <DynamicForm
                questionnaire={xmlData}
                selectedFormContentValue={selectedFormContentValue}
                handleRadioChange={handleRadioChange}
                handleTextChange={handleTextChange}
                selectedValues={selectedValues}
                handleSaveButton={handleSaveButton}
                handleCheckBoxChange={handleCheckBoxChange}
                handleInputChangeForEnvTable={handleInputChangeForEnvTable}
                homeButtonClickHandler={homeButtonClickHandler}
              />
            )}
        </div>
      )}
    </>
  );
};

export default App;
