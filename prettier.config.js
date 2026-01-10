import * as prettierPluginOxc from "@prettier/plugin-oxc";

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
"singleQuote": true,
"trailingComma": "all",
"arrowParens": "always",
"bracketSpacing": true,
"semi": true,
"plugins": [prettierPluginOxc]
};

export default config;
