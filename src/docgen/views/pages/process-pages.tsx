import React from 'react';
import pico from 'picocolors'
import cheerio from 'cheerio';
import { Main } from './main/main';
import { WebCover } from './web-cover/web-cover';
import { toHTML } from "../html";

export const deriveParameters = ({
  parameters,
  setVersion,
  setReleaseDate,
  mathMathjax,
  mathKatex,
  templates,
  version,
  homeLink
}) => {
  //the homepage is the first link in the first heading
  const homePagePath = `${homeLink.source.slice(0, homeLink.source.lastIndexOf('.'))}.html`;

  const currentDate = new Date();
  const date = currentDate.toLocaleDateString('en-GB'); // 'DD/MM/YYYY'
  const time = currentDate.toLocaleTimeString('en-US', { hour12: false }); // 'HH:mm:ss'
  const year = currentDate.getFullYear().toString(); // 'YYYY'
  let attribution =
    'Created by DocGen ' + version + ' on ' + date + ' at ' + time + '.';

  let releaseVersion = parameters.version;
  if (setVersion !== false) {
    releaseVersion = setVersion;
  }
  let releaseDate = parameters.date;
  if (setReleaseDate !== false) {
    releaseDate = setReleaseDate;
  }

  let backlink = '';
  if (parameters.backlink.url !== '') {
    backlink +=
      '<a class="button inverted" href="' +
      parameters.backlink.url +
      '">' +
      parameters.backlink.name +
      '</a>';
  } else {
    backlink += parameters.backlink.name;
  }

  const webFooter =
    'Version ' + releaseVersion + ' released on ' + releaseDate + '.';

  for (let key in templates) {
    if (templates.hasOwnProperty(key)) {
      let $ = templates[key];
      $('title').text(parameters.title);
      $('#dg-version').text(releaseVersion);
      $('#dg-web-title-version').text('(' + releaseVersion + ')');
      $('#dg-release-date').text(releaseDate);
      $('#dg-backlink').html(backlink);
    }
  }
  if (mathKatex === true) {
    let $ = templates.main;
    //support for KaTeX (bundled with DocGen)
    $('head').append(
      '<link rel="stylesheet" href="require/katex/katex.min.css" type="text/css">',
    );
    $('head').append(
      '<script type="text/javascript" src="require/katex/katex.min.js"></script>',
    );
    $('head').append(
      '<script type="text/javascript" src="require/katexInjector.js"></script>',
    );
  }
  if (mathMathjax === true) {
    let $ = templates.main;
    //support for MathJax (only supported via CDN due to very large size)
    //MathJax configuration is the same as used by math.stackexchange.com
    //Note - wkhtmlpdf //cdn urls - see https://github.com/wkhtmltopdf/wkhtmltopdf/issues/1634
    //Note - later than version 2 doesn't work with wkhtmltodpf
    $('head').append(
      `<script type="text/javascript" id="MathJax-script" async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
        </script>`,
    );
  }
  return {
    ...parameters,
    attribution,
    year,
    webFooter,
    releaseDate,
    homePagePath
  }
};

export const processPages = async ({
  pages,
  sortedPages,
  parameters,
  options,
  contents,
  templates
}) => {
  const pageTableOfContentsEnabled = options.pageToc;
  const tableOfContents = contents;
  const mainTemplate = templates.main;
  const webCover = templates.webCover;
  const pdfEnabled = options.pdf;
  console.log(pico.green('Generating the static web content'));
  tableOfContents.forEach((section) => {
    section.pages.forEach((page) => {
      let $ = cheerio.load(mainTemplate.html()); //clone
      const htmlPage = toHTML(
        <Main
          parameters={parameters}
          sortedPages={sortedPages}
          pdfEnabled={pdfEnabled}
        />
      );
      $('body').html(htmlPage);
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
  const webCoverHtml = toHTML(
    <Main
      parameters={parameters}
      sortedPages={sortedPages}
      pdfEnabled={pdfEnabled}
    >
      <WebCover
        parameters={parameters}
      />
    </Main>
  );
  let $ = cheerio.load(mainTemplate.html());
  let webCoverStyles = cheerio.load(webCover.html());
  $('head').append(webCoverStyles('head').html());
  $('body').html(webCoverHtml);
  return $;
};
