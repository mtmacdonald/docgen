import path from 'node:path';
import fs from 'fs-extra';

interface GenerateOptions {
  inputDir: string;
  outputDir: string;
}

export const generate = async (options: GenerateOptions) => {
  const { inputDir, outputDir } = options;

  // Prebuilt app is relative to this script in the package
  const packageAppDir = path.resolve(import.meta.dirname, '../../dist/app');

  // 1. Remove existing output folder
  await fs.remove(outputDir);

  // 2. Copy the user's input files
  await fs.copy(inputDir, outputDir);

  // 3. Copy the prebuilt app into outputDir/app
  await fs.copy(packageAppDir, outputDir);

  console.log(`Merged files into ${outputDir}`);
};
