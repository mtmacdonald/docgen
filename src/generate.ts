import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';

export const runVite = async (command, mode) => {
  const inputDir = path.resolve(process.cwd(), command.input);
  const outputDir = path.resolve(process.cwd(), command.output);

  console.log(`Input (user docs): ${inputDir}`);
  console.log(`Output (build dir): ${outputDir}`);
  console.log(`Running Vite in ${mode} mode...`);

  const baseConfig = {
    root: process.cwd(),
    plugins: [react()],
    define: {
      __DOCGEN_INPUT__: JSON.stringify(inputDir),
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
