import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);
export async function execute(command) {
  try {
    const { stdout, stderr } = await execPromise(command);
    return stdout;
    //console.log('stdout:', stdout);
    //console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}
