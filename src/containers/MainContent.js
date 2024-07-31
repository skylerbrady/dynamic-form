import React, { useState, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import { fetchXmlData } from "../common/commonHelpers";
import ConsentForm from "../components/ConsentForm";
import FormContents from "../components/FormContents";
import Header from "../common/Header";
import { useMsal } from "@azure/msal-react";
import { api } from "../common/api";

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
    let createFormData = { ...selectedValues };
    createFormData["XMLVersionId"] = "1";
    console.log(selectedValues);
    // if (props.accessToken) {
    let securityKey =
      "80-E9-CD-69-03-67-25-DF-02-3C-30-16-ED-13-23-6A-F7-8D-95-65-24-02-D2-C7-9C-93-74-05-DF-68-78-A4-ED-91-1E-1B-94-A8-7B-2E-4A-AE-CB-F0-85-44-0A-C0";
    try {
      const response = await api(
        " props.accessToken",
        securityKey,
        "https://ue2ppbexbhwap01.azurewebsites.net/api/DemandQuestionnaire",
        "PUT",
        createFormData
      );
      console.log("API response:", response);
      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error calling the API", error);
    }
    // } else {
    //   console.error("No access token available");
    // }
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

  const getAnswerData = async () => {
    let securityKey =
      "80-E9-CD-69-03-67-25-DF-02-3C-30-16-ED-13-23-6A-F7-8D-95-65-24-02-D2-C7-9C-93-74-05-DF-68-78-A4-ED-91-1E-1B-94-A8-7B-2E-4A-AE-CB-F0-85-44-0A-C0";
    try {
      const response = await api(
        " props.accessToken",
        securityKey,
        "https://ue2ppbexbhwap01.azurewebsites.net/api/Lookup",
        "GET"
      );
      console.log("API response:", response);
      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error calling the API", error);
    }
  };
  const userName = accounts[0]?.name || accounts[0]?.username || "User";
  return (
    <>
      <Header userName={userName} />
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
              <>
                <button
                  onClick={() => {
                    getAnswerData();
                  }}
                >
                  GetCall
                </button>
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
