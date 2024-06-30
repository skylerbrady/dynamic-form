import React from "react";
import "./styles/EnvironmentTable.css";
const EnvironmentTable = ({ tableData }) => {
  const { TableRow, TableData } = tableData;
  const headers = TableRow.split(",").map((header) => header.trim());
  const rows = [];
  let currentRow = [];
  TableData.forEach((data, index) => {
    const { TableDataType, TableDataValue } = data;
    currentRow.push({ type: TableDataType, value: TableDataValue });
    if ((index + 1) % headers.length === 0) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  return (
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
                  <select>
                    {cell.value.split(",").map((option, optionIndex) => (
                      <option key={optionIndex} value={option.trim()}>
                        {option.trim()}
                      </option>
                    ))}
                  </select>
                )}
                {cell.type === "TextField" && <input type="text" />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default EnvironmentTable;
