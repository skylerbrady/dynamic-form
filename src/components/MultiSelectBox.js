import React, { useState } from "react";

const CheckboxList = ({ question, selectedItems, onChange }) => {
  return (
    <div>
      {question["AnswerData"].split(",").map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            value={item}
            checked={selectedItems.includes(item)}
            onChange={onChange}
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
        {selectedItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const MultiSelectBox = ({ question }) => {
  console.log(question);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedItems((prevSelectedItems) =>
      checked
        ? [...prevSelectedItems, value]
        : prevSelectedItems.filter((item) => item !== value)
    );
  };

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
          selectedItems={selectedItems}
          onChange={handleCheckboxChange}
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
        <SelectedItemsBox selectedItems={selectedItems} />
      </div>
    </div>
  );
};

export default MultiSelectBox;
