import { rmSync } from 'fs';
import { execSync } from 'child_process';

rmSync('src/app/styles/style-variables', { recursive: true, force: true });

execSync('pnpm style-dictionary build --config src/app/styles/config.json', {
  stdio: 'inherit',
});

execSync('pnpm formatting:fix', { stdio: 'inherit' });
