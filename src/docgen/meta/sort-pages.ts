export const sortPages = ({tableOfContents}) => {
  //sort the contents by heading
  let sortedPages = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  tableOfContents.forEach((section) => {
    if (sortedPages.hasOwnProperty(section.column)) {
      sortedPages[section.column].push(section);
    }
  });
  return sortedPages;
};
