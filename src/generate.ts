import path from 'node:path';
import { build, loadConfigFromFile, mergeConfig } from 'vite';

export const generate = async (command) => {
  const { input, output } = command;
  console.log(input, output);
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
    // Keep the root as is (project root)
    build: {
      outDir: path.resolve(process.cwd(), command.output),
      emptyOutDir: true,
    },
  });

  console.log(JSON.stringify(finalConfig, null, 2));

  await build(finalConfig);
};
