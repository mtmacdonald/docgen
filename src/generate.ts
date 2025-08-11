import path from 'node:path';
import { build, createServer, loadConfigFromFile, mergeConfig } from 'vite';
import { copyStaticFiles } from './copy-static-files.ts';

export const runVite = async (command, mode) => {
  const inputDir = path.resolve(process.cwd(), command.input);
  const outputDir = path.resolve(process.cwd(), command.output);

  console.log(`Input (user docs): ${inputDir}`);
  console.log(`Output (build dir): ${outputDir}`);
  console.log(`Running Vite in ${mode} mode...`);

  const configPath = path.resolve(process.cwd(), 'vite.config.ts');
  const loaded = await loadConfigFromFile(
    { command: mode, mode: mode === 'serve' ? 'development' : 'production' },
    configPath,
  );

  if (!loaded) throw new Error('Could not load Vite config');

  const finalConfig = mergeConfig(loaded.config, {
    build: mode === 'build' ? { outDir: outputDir, emptyOutDir: true } : {},
    define: {
      __DOCGEN_INPUT__: JSON.stringify(inputDir),
    },
  });

  if (mode === 'build') {
    await build(finalConfig);
    await copyStaticFiles(inputDir, outputDir);
  } else {
    await copyStaticFiles(inputDir, path.join(process.cwd(), 'public'));
    const server = await createServer(finalConfig);
    await server.listen();
    server.printUrls();
  }
};
