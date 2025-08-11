// Parse args however you like, example:
import { runVite } from './generate.ts';

const args = process.argv.slice(2);
const mode = args[0] === 'dev' ? 'serve' : 'build';
const command = { input: 'src/docs', output: './docs-new' };

runVite(command, mode).catch((err) => {
  console.error(err);
  process.exit(1);
});
