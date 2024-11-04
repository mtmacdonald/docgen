import { cloneDeep } from 'lodash';
import React from 'react';
import pico from 'picocolors'
import cheerio from 'cheerio';
import { Main } from './main/main';
import { Cover } from './cover/cover';
import { toHTML } from "../html";

export const processTemplates = ({
  parameters,
  mathMathjax,
  mathKatex,
  templates: rawTemplates,
}) => {
  //Todo: rewrite in non-mutating style (for now just clone)
  const templates = cloneDeep(rawTemplates);
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
    $('head').append(
      `<script type="text/javascript" id="MathJax-script" async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
        </script>`,
    );
  }
  return templates;
};

export const processPages = async ({
  templates,
  pages: rawPages,
  sortedPages,
  parameters,
  options,
  contents,
}) => {
  const hydratedTemplates = processTemplates({
    parameters,
    templates,
    mathMathjax: options.mathMathjax,
    mathKatex: options.mathKatex,
  });
  //Todo: rewrite in non-mutating style (for now just clone)
  const pages = cloneDeep(rawPages);
  const pageTableOfContentsEnabled = options.pageToc;
  const tableOfContents = contents;
  const mainTemplate = hydratedTemplates.main;
  const pdfEnabled = options.pdf;
  console.log(pico.green('Generating the static web content'));
  tableOfContents.forEach((section) => {
    section.pages.forEach((page) => {
      let $ = cheerio.load(mainTemplate.html()); //clone
      let key = page.source;
      const htmlPage = toHTML(
        <Main
          parameters={parameters}
          sortedPages={sortedPages}
          pdfEnabled={pdfEnabled}
        />
      );
      $('body').html(htmlPage);
      //Todo: render the Markdown directly inside the React component
      const content = pages[key];
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
      pages[key] = $.html();
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
  $('body').html(webCoverHtml);

  return {
    pages,
    redirect: hydratedTemplates.redirect,
    webCover: $.html(),
  };
};
