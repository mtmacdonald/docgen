import path from 'node:path';
import { build, loadConfigFromFile, mergeConfig } from 'vite';

export const generate = async (command) => {
  const inputDir = path.resolve(process.cwd(), command.input); // user markdown path
  const outputDir = path.resolve(process.cwd(), command.output); // site output path

  console.log('Input (user docs):', inputDir);
  console.log('Output (build dir):', outputDir);
  console.log('Building DocGen Site...');

  // Optionally pass inputDir to your app via define or env
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
      __DOCGEN_INPUT__: JSON.stringify(inputDir), // optional way to pass input to your app
    },
  });

  await build(finalConfig);
};
