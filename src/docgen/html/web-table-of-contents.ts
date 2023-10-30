
export const generateWebTableOfContents = ({
  sortedPages,
  mainTemplate,
  name,
  pdfEnabled,
}) => {
  let pdfName = name.toLowerCase() + '.pdf';
  let $ = mainTemplate;
  let html = [],
    i = -1;
  html[++i] = '<div><table class="unstyled"><tr>';
  //build the contents HTML
  for (let key in sortedPages) {
    if (sortedPages.hasOwnProperty(key)) {
      if (key !== String(5)) {
        //skip the extra column
        html[++i] = '<td class="dg-tocGroup">';
        sortedPages[key].forEach((section) => {
          html[++i] =
            '<ul><li class="dg-tocHeading">' + section.heading + '</li>';
          section.pages.forEach((page) => {
            let name = page.source.substr(0, page.source.lastIndexOf('.'));
            let path = name + '.html';
            html[++i] =
              '<li><a href="' + path + '">' + page.title + '</a></li>';
          });
          html[++i] = '</li></ul>';
        });
        html[++i] = '</td>';
      }
    }
  }

  //fixed-width column at end
  html[++i] = '<td class="dg-tocGroup" id="dg-tocFixedColumn"><ul>';
  html[++i] =
    '<li><span class="w-icon dg-tocIcon" data-name="person_group" title="archive"></span><a href="ownership.html">Ownership</a></li>';
  html[++i] =
    '<li><span class="w-icon dg-tocIcon" data-name="refresh" title="archive"></span><a href="release-notes.html">Release Notes</a></li>';
  html[++i] = '</ul><div>';
  if (pdfEnabled) {
    html[++i] =
      '<button class="whiteInverted" onclick="window.location=\'' +
      pdfName +
      '\';">';
    html[++i] = '<span>PDF</span>';
    html[++i] = '</button>';
  }
  html[++i] = '</div></td>';
  html[++i] = '</tr></table></div>';
  $('#dg-toc').html(html.join(''));
  return $;
};
