import * as path from 'path';
import * as fs from 'fs';

import AdmZip from 'adm-zip';

export async function zipFile(
  sourceDir: string,
  outputAlsPath: string,
): Promise<void> {
  try {
    const zip = new AdmZip();

    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        const relativePath = path.relative(sourceDir, filePath);
        zip.addFile(relativePath, fs.readFileSync(filePath));
      }
    }

    zip.writeZip(outputAlsPath);

    console.log(
      `Files in ${sourceDir} successfully zipped to ALS file: ${outputAlsPath}`,
    );
  } catch (error) {
    console.error('Error during zip:', error);
  }
}
