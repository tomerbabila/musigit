import remote from '@electron/remote';
import AdmZip from 'adm-zip';
import { ResponseModel } from './helpers';

const electronFs = remote.require('fs');
const electronPath = remote.require('path');

export class Zip {
  async zipFile(
    sourceDir: string,
    outputAlsPath: string,
  ): Promise<ResponseModel> {
    try {
      const zip = new AdmZip();

      const files = electronFs.readdirSync(sourceDir);
      for (const file of files) {
        const filePath = electronPath.join(sourceDir, file);
        const fileStat = electronFs.statSync(filePath);

        if (fileStat.isFile()) {
          const relativePath = electronPath.relative(sourceDir, filePath);
          zip.addFile(relativePath, electronFs.readFileSync(filePath));
        }
      }

      zip.writeZip(outputAlsPath);

      console.log(
        `Files in ${sourceDir} successfully zipped to ALS file: ${outputAlsPath}`,
      );
      return {
        success: true,
        message: 'Files successfully zipped to ALS file',
      };
    } catch (error) {
      console.error('Error during zip:', error);
      return { success: false, message: 'Error during zip', data: error };
    }
  }

  unzipFile(alsFilePath: string, outputDir: string): ResponseModel {
    try {
      const zip = new AdmZip(alsFilePath);
      zip.extractAllTo(outputDir, true);
      console.log(
        `ALS file ${alsFilePath} successfully unzipped to ${outputDir}`,
      );
      return { success: true, message: 'ALS file successfully unzipped' };
    } catch (error) {
      console.error('Error during decompression:', error);
      return {
        success: false,
        message: 'Error during decompression',
        data: error,
      };
    }
  }
}
