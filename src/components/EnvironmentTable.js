import React from "react";
import "./styles/EnvironmentTable.css";

const EnvironmentTable = ({
  question,
  handleInputChangeForEnvTable,
  selectedValues,
}) => {
  const { TableRow, TableData } = question;
  const headers = TableRow.split(",").map((header) => header.trim());
  const rows = [];
  let currentRow = [];

  // Populate rows from TableData
  TableData.forEach((data, index) => {
    const { TableDataType, TableDataValue } = data;
    currentRow.push({ type: TableDataType, value: TableDataValue });
    if ((index + 1) % headers.length === 0) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {cell.type === "text" && cell.value}
                  {cell.type === "dropdown" && (
                    <select
                      name={`${rowIndex}-${cellIndex}`}
                      value={
                        selectedValues[question.$.ID]?.[
                          `${rowIndex}-${cellIndex}`
                        ] || ""
                      }
                      onChange={(e) =>
                        handleInputChangeForEnvTable(
                          question.$.ID,
                          e,
                          rowIndex,
                          cellIndex
                        )
                      }
                    >
                      {cell.value.split(",").map((option, optionIndex) => (
                        <option key={optionIndex} value={option.trim()}>
                          {option.trim()}
                        </option>
                      ))}
                    </select>
                  )}
                  {cell.type === "TextField" && (
                    <input
                      type="text"
                      name={`${rowIndex}-${cellIndex}`}
                      value={
                        selectedValues[question.$.ID]?.[
                          `${rowIndex}-${cellIndex}`
                        ] || ""
                      }
                      onChange={(e) =>
                        handleInputChangeForEnvTable(
                          question.$.ID,
                          e,
                          rowIndex,
                          cellIndex
                        )
                      }
                    />
                  )}
                  {cell.type === "checkbox" && (
                    <input
                      type="checkbox"
                      name={`${rowIndex}-${cellIndex}`}
                      checked={
                        selectedValues[question.$.ID]?.[
                          `${rowIndex}-${cellIndex}`
                        ] || ""
                      }
                      onChange={(e) =>
                        handleInputChangeForEnvTable(
                          question.$.ID,
                          e,
                          rowIndex,
                          cellIndex
                        )
                      }
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnvironmentTable;
