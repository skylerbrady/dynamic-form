import { parseString } from "xml2js";
import React from "react";
import DynamicForm from "./DynamicForm";
import "./DynamicForm.css";

// XML data stored in a variable (assuming it's corrected to valid XML)
const xmlData = `
<quiestionnaire>
  <Section title="AAA">
    <Question ID="1">
      <QuestionText>How many environments you need?</QuestionText>   
      <AnswerType>Radio Button</AnswerType>
      <AnswerData>Prod, UAT, Dev</AnswerData>
    </Question>
    <Question ID="2">
      <QuestionText>Another question...</QuestionText>   
      <AnswerType>Radio Button</AnswerType>
      <AnswerData>Option 1, Option 2, Option 3</AnswerData>
    </Question>
    <Question ID="3">
      <QuestionText>Yet another question?</QuestionText>   
      <AnswerType>Text</AnswerType>
    </Question>
  </Section>
</quiestionnaire>
`;

let questionnaireData;

parseString(xmlData, { explicitArray: false }, (err, result) => {
  if (err) {
    console.error("Error parsing XML:", err);
    return;
  }

  questionnaireData = result.quiestionnaire;
});

const App = () => {
  return (
    <div className="app">
      <DynamicForm questionnaire={questionnaireData} />
    </div>
  );
};

export default App;
