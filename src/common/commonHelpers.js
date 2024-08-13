import xml2js from "xml2js";
import xml1 from "./xml1.txt";
import xml2 from "./xml2.txt";
import xml3 from "./xml3.txt";
import xml4 from "./xml4.txt";
import xml5 from "./xml5.txt";

export const sortQuestionsAcrossSections = (data) => {
  // Collect all questions into a single array
  let allQuestions = [];

  data.questionnaire.Section.forEach((section) => {
    // Ensure Question is always an array
    if (!Array.isArray(section.Question)) {
      section.Question = [section.Question];
    }
    allQuestions = allQuestions.concat(section.Question);
  });

  // Sort the questions based on QuestionSequenceNo
  allQuestions.sort((a, b) => {
    return (
      parseInt(a.QuestionSequenceNo, 10) - parseInt(b.QuestionSequenceNo, 10)
    );
  });

  // Reassign sorted questions to sections, preserving the structure
  let questionIndex = 0;

  data.questionnaire.Section.forEach((section) => {
    const sectionQuestionCount = section.Question.length;

    // Assign sorted questions back to this section
    section.Question = allQuestions.slice(
      questionIndex,
      questionIndex + sectionQuestionCount
    );
    questionIndex += sectionQuestionCount;
  });

  return data;
};

export const fetchXmlData = async (formContentValue) => {
  const json = {
    xmlVersionId: 1,
    xmlBody:
      '<questionnaire>\r\n  <Section title="Section-1">\r\n    <Question ID="1">\r\n      <QuestionText>How many environments you need?</QuestionText>\r\n      <AnswerType>Radio Button</AnswerType>\r\n      <AnswerData>Prod, UAT, Dev</AnswerData>\r\n    </Question>\r\n    <Question ID="2">\r\n      <QuestionText>Another question...</QuestionText>\r\n      <AnswerType>Radio Button</AnswerType>\r\n      <AnswerData>Option 3, Option 4, Option 5</AnswerData>\r\n    </Question>\r\n    <Question ID="3">\r\n      <QuestionText>Yet another question?</QuestionText>\r\n      <AnswerType>Text</AnswerType>\r\n    </Question>\r\n  </Section>\r\n  <Section title="Section-2">\r\n    <Question ID="4">\r\n      <QuestionText>Yet another question?</QuestionText>\r\n      <AnswerType>Text</AnswerType>\r\n    </Question>\r\n    <Question ID="5">\r\n      <QuestionText>Check box</QuestionText>\r\n      <AnswerType>checkbox</AnswerType>\r\n      <AnswerData>Option 3, Option 4, Option 5</AnswerData>\r\n    </Question>\r\n  </Section>\r\n  <Section title="Section-3">\r\n    <Question ID="6">\r\n      <QuestionText>Multi select box</QuestionText>\r\n      <AnswerType>MultiSelectBox</AnswerType>\r\n      <AnswerData>Option 3, Option 4, Option 5</AnswerData>\r\n    </Question>\r\n  </Section>\r\n  <Section title="Section-4">\r\n    <Question ID="7">\r\n      <QuestionText>Select Yes or no</QuestionText>\r\n       <AnswerType>Radio Button</AnswerType>\r\n      <AnswerData>Yes, No</AnswerData>\r\n    </Question>\r\n    <Question ID="8">\r\n      <QuestionText>Please specify below</QuestionText>\r\n       <AnswerType>checkbox_horizontal</AnswerType>\r\n      <AnswerData>Prod, UAT, QA, Dev, others</AnswerData>\r\n    </Question>\r\n  </Section>\r\n  <Section title="Section-5">\r\n    <Question ID="9">\r\n      <QuestionText>select Dropdown</QuestionText>\r\n      <AnswerType>Dropdown</AnswerType>\r\n      <AnswerData>Option 1, Option 2, Option 3, option 4</AnswerData>\r\n    </Question>\r\n  </Section>\r\n  <Section title="Section-6">\r\n  <Question ID="10">\r\n    <QuestionText>How many environments you need?</QuestionText>\r\n    <AnswerType>Table_Env</AnswerType>\r\n    <TableRow> , Region, Subscription ID, Resource group</TableRow>\r\n    <TableData>\r\n      <TableDataType>text</TableDataType>\r\n      <TableDataValue>Product Environment</TableDataValue>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>dropdown</TableDataType>\r\n      <TableDataValue>Product, Environment</TableDataValue>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>TextField</TableDataType>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>TextField</TableDataType>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>text</TableDataType>\r\n      <TableDataValue>UAT Environment</TableDataValue>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>dropdown</TableDataType>\r\n      <TableDataValue>Product 1, Environment 1</TableDataValue>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>TextField</TableDataType>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>TextField</TableDataType>\r\n    </TableData>\r\n     <TableData>\r\n      <TableDataType>text</TableDataType>\r\n      <TableDataValue>Dev Environment</TableDataValue>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>dropdown</TableDataType>\r\n      <TableDataValue>Product 2, Environment 2</TableDataValue>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>TextField</TableDataType>\r\n    </TableData>\r\n    <TableData>\r\n      <TableDataType>TextField</TableDataType>\r\n    </TableData>\r\n  </Question>\r\n</Section>\r\n</questionnaire>',
  };

  // stringfy the JSON string
  const jsonString = JSON.stringify(json);
  // Parse the JSON string
  const jsonData = JSON.parse(jsonString);

  // Extract the XML body
  const xmlBody = jsonData.xmlBody;

  let obj, response;
  try {
    switch (formContentValue) {
      case 0:
        response = xmlBody;
        break;
      case 1:
        response = await fetch(xml1);
        break;
      case 2:
        response = await fetch(xml3);
        break;
      case 3:
        response = await fetch(xml4);
        break;
      case 4:
        response = await fetch(xml5);
        break;
      default:
        break;
    }
    const xmlText = await response.text();
    // Parse XML text to JavaScript object
    const parser = new xml2js.Parser({ explicitArray: false });
    xmlText &&
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
        } else {
          const sortedData = sortQuestionsAcrossSections(result);
          obj = sortedData;
        }
      });
  } catch (error) {
    console.error("Error fetching XML file:", error);
  }
  return obj;
};
