import path from 'node:path';
import { build, loadConfigFromFile, mergeConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generate = async (command) => {
  console.log('Running Vite build with overrides...');
  console.log(command);

  const configPath = path.resolve(process.cwd(), 'vite.config.ts');
  const loaded = await loadConfigFromFile(
    { command: 'build', mode: 'production' },
    configPath,
  );

  if (!loaded) {
    throw new Error('Could not load Vite config');
  }

  const finalConfig = mergeConfig(loaded.config, {
    // Keep the root as is (project root)
    build: {
      outDir: path.resolve(process.cwd(), command.output),
      emptyOutDir: true,
    },
  });

  await build(finalConfig);
};
z;
