import React, { useState, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import { fetchXmlData } from "../common/commonHelpers";
import ConsentForm from "../components/ConsentForm";
import FormContents from "../components/FormContents";
import Header from "../common/Header";
import { useMsal } from "@azure/msal-react";
import { api } from "../common/api";
import { COMMON, URL } from "../common/constant";

const MainContent = (props) => {
  const [xmlData, setXmlData] = useState(null);
  const [selectedConsentFormValue, setSelectedConsentFormValue] = useState("");
  const [selectedFormContentValue, setSelectedFormContentValue] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [showFormsContent, setShowFormContent] = useState(false);
  const [formContentValue, setFormContentValue] = useState("");
  const { accounts } = useMsal();
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
    setSelectedValues({});
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

  const handleSaveButton = async () => {
    let createFormData = {
      dmaDemandId: 1,
      questionnaireResponse: selectedValues,
      questionnaireStatus: 2,
    };
    console.log("state values", selectedValues);
    console.log("createFormData for api", createFormData);
    if (props.accessToken) {
      try {
        const response = await api(
          props.accessToken,
          URL.UPDATE_RESPONSE,
          "PUT",
          createFormData
        );
        console.log("API response:", response);
      } catch (error) {
        console.error("Error calling the API", error);
      }
    } else {
      console.error("No access token available");
    }
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

  const userName = accounts[0]?.name || accounts[0]?.username || "User";
  return (
    <>
      <Header userName={userName} />
      {!xmlData && formContentValue !== "" ? (
        <div>{COMMON.xmlFetchError}</div>
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
              <>
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
              </>
            )}
        </div>
      )}
    </>
  );
};

export default MainContent;
