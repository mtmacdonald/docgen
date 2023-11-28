import React from 'react';
import pico from 'picocolors'
import cheerio from 'cheerio';
import { Main } from './main/main';
import { Cover } from './cover/cover';
import { toHTML } from "../html";
import { PdfCover } from "./cover/pdf-cover";
import { PdfFooter } from "../components/pdf-footer/pdf-footer";

export const processTemplates = ({
  parameters,
  mathMathjax,
  mathKatex,
  templates,
}) => {
  //Todo: better way of dynamically setting template <head>
  for (let key in templates) {
    if (templates.hasOwnProperty(key)) {
      let $ = templates[key];
      $('title').text(parameters.title);
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
  const pdfCoverTemplate = templates.pdfCover;
  const pdfFooterTemplate = templates.pdfFooter;
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
  const webCoverHtml = toHTML(
    <Main
      parameters={parameters}
      sortedPages={sortedPages}
      pdfEnabled={pdfEnabled}
    >
      <Cover
        parameters={parameters}
      />
    </Main>
  );
  let $ = cheerio.load(mainTemplate.html());
  let webCoverStyles = cheerio.load(webCover.html());
  $('head').append(webCoverStyles('head').html());
  $('body').html(webCoverHtml);

  const pdfCoverHtml = toHTML(
    <PdfCover parameters={parameters} />
  );
  let $Pdf = cheerio.load(pdfCoverTemplate.html());
  let pdfCoverStyles = cheerio.load(pdfCoverTemplate.html());
  $Pdf('head').append(pdfCoverStyles('head').html());
  $Pdf('body').html(pdfCoverHtml);

  const pdfFooterHtml = toHTML(
    <PdfFooter parameters={parameters} />
  );
  let $PdfFooter = cheerio.load(pdfFooterTemplate.html());
  let pdfFooterStyles = cheerio.load(pdfFooterTemplate.html());
  $PdfFooter('head').append(pdfFooterStyles('head').html());
  $PdfFooter('body').html(pdfFooterHtml);

  return {
    webCover: $.html(),
    pdfCover: $Pdf.html(),
    pdfFooter: $PdfFooter.html(),
  };
};
