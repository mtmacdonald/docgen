import chalk from 'chalk';
import path from 'path';
import moment from 'moment';
import imageSizeOf from 'image-size';
import { cleanDirectory } from './fs/fs';
import { loadMeta } from './fs/meta';
import { loadTemplates } from './fs/templates';
import { loadMarkdown } from './fs/markdown';
import { checkPdfVersion, generatePdf } from './pdf/wkhtmltopdf/wkhtmltopdf';
import { scaffold } from './scaffold/scaffold';
import { sortPages } from './meta/sort-pages';
import { generateWebTableOfContents } from './html/web-table-of-contents';
import { processPages } from './html/process-pages';
import { writePages } from './fs/write-pages';
import { createRedirect } from './html/redirect';
import { version } from '../../package.json';

export function DocGen(process) {
  let mainProcess = process;
  let options;
  let templates = {};
  let meta = {};
  let pages = {};
  let sortedPages = {};

  this.getVersion = () => {
    return version;
  };

  this.setOptions = (userOptions) => {
    options = userOptions;
    //all user-specified paths must be normalized
    if (options.input) {
      options.input = path.normalize(options.input + '/');
    }
    if (options.output) {
      options.output = path.normalize(options.output + '/');
    }

    //wkhtmltopdf path does not need a trailing slash
    if (options.wkhtmltopdfPath && options.wkhtmltopdfPath !== '') {
      options.wkhtmltopdfPath = path.normalize(options.wkhtmltopdfPath);
    }
  };

  /*
    copy the example src files (template) to any directory, when scaffold command is invoked
  */

  this.scaffold = async () =>
    scaffold({
      outputDirectory: options.output,
      verbose: options.verbose === true,
    });

  this.run = async () => {
    console.log(chalk.green.bold('DocGen version ' + version));
    //delete and recreate the output directory
    await cleanDirectory(options.output);
    templates = await loadTemplates({
      verbose: options.verbose,
      mainProcess,
    });
    meta = await loadMeta({
      inputPath: options.input,
      verbose: options.verbose,
      mainProcess,
    });
    sortedPages = sortPages({ tableOfContents: meta.contents });
    pages = await loadMarkdown({
      verbose: options.verbose,
      contents: meta.contents,
      inputPath: options.input,
      mainProcess,
    });
    templates.main = generateWebTableOfContents({
      sortedPages,
      name: meta.parameters.name,
      mainTemplate: templates.main,
      pdfEnabled: options.pdf,
    });
    insertParameters();
    templates.webCover = await processPages({
      pages,
      pageTableOfContentsEnabled: options.pageToc,
      tableOfContents: meta.contents,
      mainTemplate: templates.main,
      webCover: templates.webCover,
    });
    await writePages({
      inputPath: options.input,
      outputPath: options.output,
      contents: meta.contents,
      templates,
      pages,
      pdfEnabled: options.pdf,
      mathKatex: options.mathKatex,
      verbose: options.verbose,
      mainProcess,
    });
    await createRedirect({
      isRedirectEnabled: options.redirect,
      outputDirectory: options.output,
      redirectTemplate: templates.redirect,
      homePage: meta.contents[0].pages[0],
      verbose: options.verbose,
    });
    if (options.pdf === true) {
      await checkPdfVersion({ options, mainProcess });
      await generatePdf({ options, meta, sortedPages, mainProcess });
    } else {
      console.log(chalk.green.bold('Done!'));
    }
  };

  /*
    insert the parameters into all templates
  */

  let insertParameters = () => {
    //------------------------------------------------------------------------------------------------------
    //logo dimensions
    let hasLogo = false;
    let logoWidth = 0;
    let logoHeight = 0;
    let logoPath;
    try {
      logoPath = 'files/images/logo.svg';
      let logo = imageSizeOf(`${options.input}/${logoPath}`);
      logoWidth = logo.width;
      logoHeight = logo.height;
      hasLogo = true;
    } catch (error) {
      //do nothing. If logo file cannot be read, logo is simply not shown
    }
    if (!hasLogo) {
      //PNG fallback
      try {
        logoPath = 'files/images/logo.png';
        let logo = imageSizeOf(`${options.input}/${logoPath}`);
        logoWidth = logo.width;
        logoHeight = logo.height;
        hasLogo = true;
      } catch (error) {
        //do nothing. If logo file cannot be read, logo is simply not shown
      }
    }

    //------------------------------------------------------------------------------------------------------

    //the homepage is the first link in the first heading
    let homelink = meta.contents[0].pages[0];
    homelink =
      homelink.source.substr(0, homelink.source.lastIndexOf('.')) + '.html';

    let date = moment().format('DD/MM/YYYY');
    let time = moment().format('HH:mm:ss');
    let year = moment().format('YYYY');
    let attribution =
      'Created by DocGen ' + version + ' on ' + date + ' at ' + time + '.';

    let releaseVersion = meta.parameters.version;
    if (options.setVersion !== false) {
      releaseVersion = options.setVersion;
    }
    let releaseDate = meta.parameters.date;
    if (options.setReleaseDate !== false) {
      releaseDate = options.setReleaseDate;
    }

    let author = '';
    if (meta.parameters.author.url !== '') {
      author +=
        '<a href="' +
        meta.parameters.author.url +
        '">' +
        meta.parameters.author.name +
        '</a>';
    } else {
      author += meta.parameters.author.name;
    }

    let owner = '';
    if (meta.parameters.owner.url !== '') {
      owner +=
        '<a href="' +
        meta.parameters.owner.url +
        '">' +
        meta.parameters.owner.name +
        '</a>';
    } else {
      owner += meta.parameters.owner.name;
    }

    let organization = '';
    if (meta.parameters.organization.url !== '') {
      organization +=
        '<a href="' +
        meta.parameters.organization.url +
        '">' +
        meta.parameters.organization.name +
        '</a>';
    } else {
      organization += meta.parameters.organization.name;
    }

    let website = '';
    if (meta.parameters.website.url !== '') {
      website +=
        '<a href="' +
        meta.parameters.website.url +
        '">' +
        meta.parameters.website.name +
        '</a>';
    } else {
      website += meta.parameters.website.name;
    }

    let backlink = '';
    if (meta.parameters.backlink.url !== '') {
      backlink +=
        '<a class="button inverted" href="' +
        meta.parameters.backlink.url +
        '">' +
        meta.parameters.backlink.name +
        '</a>';
    } else {
      backlink += meta.parameters.backlink.name;
    }

    let sponsorLink = '';
    if (meta.parameters.sponsorLink) {
      sponsorLink = `
        <div id="headerSponsor">
          <span>${meta.parameters.sponsorLink.name}</span>
            <a href="${meta.parameters.sponsorLink.url}">
             <img id="sponsorLogo" src="${meta.parameters.sponsorLink.logo}" alt="sponsor logo">
            </a>
        </div>
      `;
    }

    let contributors = '';
    meta.parameters.contributors.forEach((contributor) => {
      if (contributor.url !== '') {
        contributors +=
          '<a href="' + contributor.url + '">' + contributor.name + '</a>, ';
      } else {
        contributors += contributor.name + ', ';
      }
    });
    contributors = contributors.replace(/,\s*$/, ''); //remove trailing commas

    let copyright = '&copy; ' + year + ' ' + organization;

    let webTitle = meta.parameters.title;

    let webFooter =
      'Version ' + releaseVersion + ' released on ' + releaseDate + '.';

    for (let key in templates) {
      if (templates.hasOwnProperty(key)) {
        let $ = templates[key];
        //logo
        if (hasLogo === true) {
          let logoUrl = logoPath;
          $('#dg-logo').css('background-image', 'url(' + logoUrl + ')');
          $('#dg-logo').css('height', logoHeight + 'px');
          $('#dg-logo').css('padding-left', logoWidth + 25 + 'px');
        } else {
          $('#dg-logo').css('padding-left', '0');
        }
        //parameters
        $('title').text(meta.parameters.title);
        $('.dg-homelink').attr('href', homelink);
        $('#dg-title').text(meta.parameters.title);
        $('#dg-owner').html(owner);
        $('#dg-version').text(releaseVersion);
        $('#dg-web-title-version').text('(' + releaseVersion + ')');
        $('#dg-release-date').text(releaseDate);
        $('#dg-web-footer').text(webFooter);
        $('#dg-author').html(author);
        $('#dg-contributors').html(contributors);
        $('#dg-module').text(meta.parameters.module);
        $('#dg-id').html(meta.parameters.id);
        $('#dg-website').html(website);
        $('#dg-backlink').html(backlink);
        $('#headerLeftText').append(sponsorLink);
        $('#dg-summary').text(meta.parameters.summary);
        $('#dg-copyright').html(copyright);
        $('#dg-marking').text(meta.parameters.marking);
        $('#dg-legalese').text(meta.parameters.legalese);
        $('#dg-attribution').text(attribution);
      }
    }
    if (options.mathKatex === true) {
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
    if (options.mathMathjax === true) {
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
}
