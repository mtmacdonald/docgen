import fs from 'node:fs/promises';
import path from 'node:path';

export const copyStaticFiles = async (inputDir: string, outputDir: string) => {
  const filesSrcDir = path.join(inputDir, 'files');
  const filesDestDir = path.join(outputDir, 'files');

  try {
    await fs.access(filesSrcDir);
    await fs.cp(filesSrcDir, filesDestDir, { recursive: true });
    console.log(`Copied files: ${filesSrcDir} → ${filesDestDir}`);
  } catch {
    console.warn(`No 'files' folder found in ${inputDir}, skipping copy.`);
  }
};
