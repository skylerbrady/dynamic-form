import xml2js from "xml2js";
import xml1 from "./xml1.txt";
import xml2 from "./xml2.txt";
import xml3 from "./xml3.txt";
import xml4 from "./xml4.txt";
import xml5 from "./xml5.txt";
export const fetchXmlData = async (formContentValue) => {
  let obj, response;
  try {
    switch (formContentValue) {
      case 0:
        response = await fetch(xml1);
        break;
      case 1:
        response = await fetch(xml2);
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
    const xmlText = await response?.text();

    // Parse XML text to JavaScript object
    const parser = new xml2js.Parser({ explicitArray: false });
    xmlText &&
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
        } else {
          obj = result;
        }
      });
  } catch (error) {
    console.error("Error fetching XML file:", error);
  }
  return obj;
};
