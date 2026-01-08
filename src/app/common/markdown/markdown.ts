/*
  Quick-fix way to get the old markdown-it-admon implementation working still
  in the new React SPA implementation (since we now use react-markdown on
  the frontend and marked for the PDF pipeline, we need to preprocess
  something that works with both. This could use a review and better
  implementation later).
 */
export const preprocessAdmonitions = (markdown: string) => {
  return markdown.replace(
    /^!!!\s*(\w+)\s*(.*)\n((?: {4}.*\n?)+)/gm,
    (_, type, title, content) => {
      // remove 4-space indentation only from content lines
      const cleanedContent = content
        .split('\n')
        .map((line) => line.replace(/^ {4}/, ''))
        .join('\n');

      // ensure blank line before/after content to preserve hr rendering
      return `<div class="admonition ${type.toLowerCase()}">
<p class="admonition-title">${title}</p>
<p>${cleanedContent}</p>
</div>

`;
    },
  );
};
