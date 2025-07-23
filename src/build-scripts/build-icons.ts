import { promises as fsp } from 'fs';
import path from 'path';
import prettier from 'prettier';

const iconSourcePath = 'node_modules/@tabler/icons/icons/outline';
const iconsOutputPath = 'src/include/require/styles/icons.js';

const output = (icons: Record<string, string>) =>
  `var w_icons = ${JSON.stringify(icons, null, 2)};`;

/*
  -  Which Tabler icons to ship with DocGen
*/
const includeIcons = ['x', 'menu-2', 'users', 'refresh'];

export const buildIcons = async () => {
  try {
    const files = await fsp.readdir(iconSourcePath);

    const svgFiles = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      const name = path.basename(file, extension).toLowerCase();
      return extension === '.svg' && includeIcons.includes(name);
    });

    const entries = await Promise.all(
      svgFiles.map(async (file) => {
        const filePath = path.join(iconSourcePath, file);
        const content = await fsp.readFile(filePath, 'utf8');
        const key = path.basename(file, '.svg'); // Remove .svg extension from filename
        return [key, content] as const;
      }),
    );

    // Sort the icons by name
    const sortedIcons = Object.fromEntries(
      entries.sort(([a], [b]) => a.localeCompare(b)),
    );

    const rawOutput = output(sortedIcons);

    const prettierConfig = await prettier.resolveConfig(
      path.resolve(import.meta.dirname, '..'),
    );

    const formattedOutput = await prettier.format(rawOutput, {
      ...prettierConfig,
      parser: 'typescript',
    });

    await fsp.writeFile(iconsOutputPath, formattedOutput, 'utf8');
  } catch (error) {
    console.error(error);
  }
};
