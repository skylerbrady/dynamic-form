import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import "./DynamicForm.css";
import { fetchXmlData } from "./common/commonHelpers";

const App = () => {
  const [xmlData, setXmlData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchXmlData();
        setXmlData(data.questionnaire ? data.questionnaire : null);
      } catch (error) {
        console.error("Error fetching or parsing XML data");
        // Handle error state or display error message as needed
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!xmlData ? (
        <div>Error fetching or parsing XML data</div>
      ) : (
        <div className="app">
          <DynamicForm questionnaire={xmlData} />
        </div>
      )}
    </>
  );
};

export default App;
