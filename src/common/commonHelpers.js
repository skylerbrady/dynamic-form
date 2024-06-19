import xml2js from "xml2js";
import xml from "./xml.txt";
export const fetchXmlData = async () => {
  let obj;
  try {
    const response = await fetch(xml);
    const xmlText = await response.text();

    // Parse XML text to JavaScript object
    const parser = new xml2js.Parser({ explicitArray: false });
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
