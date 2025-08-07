import { Markdown } from './markdown.tsx';

const md = `
# Hello

This is *Markdown*.

- List
- [x] Task
- \`inline code\`

\`\`\`js
console.log('Hello world')
\`\`\`
`;

export const Page = () => <Markdown content={md} />;