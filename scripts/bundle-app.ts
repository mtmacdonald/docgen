import { rmSync, cpSync } from 'fs';

const paths = ['dist/app', 'dist/template'];

// Clean
paths.forEach((p) => rmSync(p, { recursive: true, force: true }));

// Copy
cpSync('src/app', 'dist/app', { recursive: true });
cpSync('src/template', 'dist/template', { recursive: true });
