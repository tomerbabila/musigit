import * as fs from 'fs';

import { parseString } from 'xml2js';

export function readAndShowXml(xmlFilePath: string): void {
  try {
    const xmlContent = fs.readFileSync(xmlFilePath, 'utf-8');

    parseString(xmlContent, (error, result) => {
      if (error) {
        throw new Error(`Error parsing XML: ${error.message}`);
      }

      console.log('Parsed XML:', JSON.stringify(result, null, 2));
    });
  } catch (error) {
    console.error('Error reading or parsing XML: ', error);
  }
}
