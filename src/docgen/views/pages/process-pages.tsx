import pkg from 'lodash';
import React from 'react';
import pico from 'picocolors'
import * as cheerio from 'cheerio';
import { Main } from './main/main';
import { Cover } from './cover/cover';
import { toHTML } from "../html";

const { cloneDeep } = pkg;

export const processTemplates = ({
  parameters,
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
      if (!page.hideAutomaticPageHeading) {
        $('#dg-innerContent').prepend(
          '<h1 id="dg-autoTitle">' + page.title + '</h1>',
        );
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
