import React, { useState, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import { fetchXmlData } from "../common/commonHelpers";
import ConsentForm from "../components/ConsentForm";
import FormContents from "../components/FormContents";

const App = () => {
  const [xmlData, setXmlData] = useState(null);
  const [selectedConsentFormValue, setSelectedConsentFormValue] = useState("");
  const [selectedFormContentValue, setSelectedFormContentValue] = useState("");
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchXmlData();
        setXmlData(data.questionnaire ? data.questionnaire : null);
      } catch (error) {
        console.error("Error fetching or parsing XML data");
      }
    };

    fetchData();
  }, []);

  const consentFormValueHandler = (value) => {
    setSelectedConsentFormValue(value);
  };

  const formContentsValueHandler = (value) => {
    setSelectedFormContentValue(value);
  };
  const handleRadioChange = (sectionTitle, questionId, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [sectionTitle]: {
        ...prevValues[sectionTitle],
        [questionId]: value,
      },
    }));
  };

  const handleTextChange = (sectionTitle, questionId, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [sectionTitle]: {
        ...prevValues[sectionTitle],
        [questionId]: value,
      },
    }));
  };

  const handleSaveButton = () => {
    let createFormData = {
      [selectedFormContentValue]: [selectedValues],
    };
    console.log(createFormData);
  };
  return (
    <>
      {!xmlData ? (
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
          {selectedConsentFormValue === "Yes" &&
            selectedFormContentValue === "" && (
              <FormContents
                formContentsValueHandler={formContentsValueHandler}
                selectedFormContentValue={selectedFormContentValue}
              />
            )}
          {selectedConsentFormValue === "Yes" &&
            selectedFormContentValue !== "" && (
              <DynamicForm
                questionnaire={xmlData}
                selectedFormContentValue={selectedFormContentValue}
                handleRadioChange={handleRadioChange}
                handleTextChange={handleTextChange}
                selectedValues={selectedValues}
                handleSaveButton={handleSaveButton}
              />
            )}
        </div>
      )}
    </>
  );
};

export default App;
