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
  const [selectedValue, setSelectedValue] = useState([]);

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
                handleCheckBoxChange={handleCheckBoxChange}
                handleInputChangeForEnvTable={handleInputChangeForEnvTable}
              />
            )}
        </div>
      )}
    </>
  );
};

export default App;
