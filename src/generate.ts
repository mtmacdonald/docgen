import fs from 'node:fs';
import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';

export const runVite = async (command, mode) => {
  const inputDir = path.resolve(process.cwd(), command.input);
  const publicDir = path.join(inputDir, 'files');
  const outputDir = path.resolve(process.cwd(), command.output);

  const parametersPath = path.join(inputDir, 'parameters.json');
  // TODO: reinstate schema validation
  const parametersJson = JSON.parse(fs.readFileSync(parametersPath, 'utf-8'));

  const baseConfig = {
    root: process.cwd(),
    publicDir,
    plugins: [react()],
    define: {
      __DOCGEN_PARAMETERS__: JSON.stringify(parametersJson),
    },
  };

  if (mode === 'build') {
    await build({
      ...baseConfig,
      build: { outDir: outputDir, emptyOutDir: true },
    });
  } else {
    const server = await createServer(baseConfig);
    await server.listen();
    server.printUrls();
  }
};
