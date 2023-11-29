import AdmZip from 'adm-zip';

export function unzipFile(alsFilePath: string, outputDir: string): void {
  try {
    const zip = new AdmZip(alsFilePath);
    zip.extractAllTo(outputDir, true);

    console.log(
      `ALS file ${alsFilePath} successfully unzipped to ${outputDir}`,
    );
  } catch (error) {
    console.error('Error during decompression:', error);
  }
}
