import chalk from 'chalk';
import cheerio from 'cheerio';

export const processPages = async ({
  pages,
  pageTableOfContentsEnabled,
  tableOfContents,
  mainTemplate,
  webCover
}) => {
  console.log(chalk.green('Generating the static web content'));
  tableOfContents.forEach((section) => {
    section.pages.forEach((page) => {
      let $ = cheerio.load(mainTemplate.html()); //clone
      let key = page.source;
      let content = pages[key];
      //add relevant container
      if (page.html === true) {
        //raw HTML pages should not be confined to the fixed width
        $('#dg-content').html('<div id="dg-innerContent"></div>');
      } else {
        //Markdown pages should be confined to the fixed width
        $('#dg-content').html(
          '<div class="w-fixed-width"><div id="dg-innerContent"></div></div>',
        );
      }
      $('#dg-innerContent').html(content);
      //------------------------------------------------------------------------------------------------------
      //insert permalinks for every page heading
      //when pageToc is enabled, also insert a page-level table of contents
      let html = [],
        i = -1;
      let headings = $('h1, h2, h3, h4, h5, h6');
      if (headings.length > 0) {
        html[++i] = '<ul class="dg-pageToc">';
      }
      headings.each(function () {
        let label = $(this).text();
        let anchor = label.toLowerCase().replace(/\s+/g, '-');
        $(this).attr('id', anchor);
        html[++i] = '<li><a href="#' + anchor + '">' + label + '</a></li>';
      });
      if (headings.length > 0) {
        html[++i] = '</ul>';
      }
      if (pageTableOfContentsEnabled === true && page.html !== true) {
        $('#dg-innerContent').prepend(html.join(''));
      }
      //------------------------------------------------------------------------------------------------------
      //prepend the auto heading (which makes the PDF table of contents match the web TOC)
      $('#dg-innerContent').prepend(
        '<h1 id="dg-autoTitle">' + page.title + '</h1>',
      );
      if (page.html === true) {
        $('#dg-autoTitle').addClass('dg-hiddenTitle');
      }
      //------------------------------------------------------------------------------------------------------
      //apply the w-table class
      $('table:not(.unstyled)').addClass('w-table w-fixed w-stripe');
      //------------------------------------------------------------------------------------------------------
      pages[key] = $;
    });
  });
  //add web ownership page
  let $ = cheerio.load(mainTemplate.html()); //clone
  $('#dg-content').html(
    '<div class="w-fixed-width"><div id="dg-innerContent"></div></div>',
  );
  $('#dg-innerContent').html(webCover.html());
  return $;
};
