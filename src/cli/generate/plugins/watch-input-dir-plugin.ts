import path from 'node:path';
import { Plugin } from 'vite';

export const watchInputDirPlugin = (inputDir: string): Plugin => {
  return {
    name: 'watch-input-dir',
    configureServer(server) {
      const watchPattern = path.join(inputDir, '**/*.{md,json,png}');
      server.watcher.add(watchPattern);
      const handleFileChange = (changedPath: string) => {
        console.log(
          `Input file changed, reloading: ${path.relative(inputDir, changedPath)}`,
        );
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', handleFileChange);
      server.watcher.on('change', handleFileChange);
      server.watcher.on('unlink', handleFileChange);
    },
  };
};
