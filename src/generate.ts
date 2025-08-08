import path from 'node:path';
import fs from 'node:fs/promises';
import { build, loadConfigFromFile, mergeConfig } from 'vite';

export const generate = async (command) => {
  const inputDir = path.resolve(process.cwd(), command.input); // user markdown path
  const outputDir = path.resolve(process.cwd(), command.output); // site output path
  const filesSrcDir = path.join(inputDir, 'files');
  const filesDestDir = path.join(outputDir, 'files');

  console.log('Input (user docs):', inputDir);
  console.log('Output (build dir):', outputDir);
  console.log('Building DocGen Site...');

  const configPath = path.resolve(process.cwd(), 'vite.config.ts');
  const loaded = await loadConfigFromFile(
    { command: 'build', mode: 'production' },
    configPath,
  );

  if (!loaded) {
    throw new Error('Could not load Vite config');
  }

  const finalConfig = mergeConfig(loaded.config, {
    build: {
      outDir: outputDir,
      emptyOutDir: true,
    },
    define: {
      __DOCGEN_INPUT__: JSON.stringify(inputDir),
    },
  });

  await build(finalConfig);

  // Copy static files folder if it exists
  try {
    await fs.access(filesSrcDir);
    await fs.cp(filesSrcDir, filesDestDir, { recursive: true });
    console.log(`Copied files: ${filesSrcDir} → ${filesDestDir}`);
  } catch {
    console.warn(`No 'files' folder found in ${inputDir}, skipping copy.`);
  }
};
