import React, { useState } from "react";

const getCheckBoxValue = (selectedValues, question, option) => {
  let item = selectedValues[question.$.ID]?.split(",");
  let index = item?.findIndex((val) => val === option);
  return index >= 0;
};

const CheckboxList = ({ question, handleCheckBoxChange, selectedValues }) => {
  return (
    <div>
      {question["AnswerData"].split(",").map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            value={item}
            checked={getCheckBoxValue(selectedValues, question, item.trim())}
            onChange={(e) =>
              handleCheckBoxChange(question.$.ID, e.target.checked, item.trim())
            }
          />
          {item}
        </label>
      ))}
    </div>
  );
};

const SelectedItemsBox = ({ selectedItems }) => {
  return (
    <div>
      <h3>Selected Items:</h3>
      <ul>
        {selectedItems?.map((item) => item && <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

const MultiSelectBox = ({ question, handleCheckBoxChange, selectedValues }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          width: "45%",
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
        }}
      >
        <h3>Select Items:</h3>
        <CheckboxList
          question={question}
          handleCheckBoxChange={handleCheckBoxChange}
          selectedValues={selectedValues}
        />
      </div>
      <div
        style={{
          width: "45%",
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
        }}
      >
        <SelectedItemsBox
          selectedItems={selectedValues[question.$.ID]?.split(",")}
        />
      </div>
    </div>
  );
};

export default MultiSelectBox;
