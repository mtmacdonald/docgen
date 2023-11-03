import chalk from 'chalk';
import cheerio from 'cheerio';
import moment from 'moment';
import imageSizeOf from 'image-size';

export const insertParameters = ({
  inputPath,
  parameters,
  setVersion,
  setReleaseDate,
  mathMathjax,
  mathKatex,
  templates,
  version,
  homeLink
}) => {
  //------------------------------------------------------------------------------------------------------
  //logo dimensions
  let hasLogo = false;
  let logoWidth = 0;
  let logoHeight = 0;
  let logoPath;
  try {
    logoPath = 'files/images/logo.svg';
    let logo = imageSizeOf(`${inputPath}/${logoPath}`);
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
      let logo = imageSizeOf(`${inputPath}/${logoPath}`);
      logoWidth = logo.width;
      logoHeight = logo.height;
      hasLogo = true;
    } catch (error) {
      //do nothing. If logo file cannot be read, logo is simply not shown
    }
  }

  //------------------------------------------------------------------------------------------------------

  //the homepage is the first link in the first heading
  let homelink = homeLink;
  homelink =
    homelink.source.substr(0, homelink.source.lastIndexOf('.')) + '.html';

  let date = moment().format('DD/MM/YYYY');
  let time = moment().format('HH:mm:ss');
  let year = moment().format('YYYY');
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

  let author = '';
  if (parameters.author.url !== '') {
    author +=
      '<a href="' +
      parameters.author.url +
      '">' +
      parameters.author.name +
      '</a>';
  } else {
    author += parameters.author.name;
  }

  let owner = '';
  if (parameters.owner.url !== '') {
    owner +=
      '<a href="' +
      parameters.owner.url +
      '">' +
      parameters.owner.name +
      '</a>';
  } else {
    owner += parameters.owner.name;
  }

  let organization = '';
  if (parameters.organization.url !== '') {
    organization +=
      '<a href="' +
      parameters.organization.url +
      '">' +
      parameters.organization.name +
      '</a>';
  } else {
    organization += parameters.organization.name;
  }

  let website = '';
  if (parameters.website.url !== '') {
    website +=
      '<a href="' +
      parameters.website.url +
      '">' +
      parameters.website.name +
      '</a>';
  } else {
    website += parameters.website.name;
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

  let sponsorLink = '';
  if (parameters.sponsorLink) {
    sponsorLink = `
        <div id="headerSponsor">
          <span>${parameters.sponsorLink.name}</span>
            <a href="${parameters.sponsorLink.url}">
             <img id="sponsorLogo" src="${parameters.sponsorLink.logo}" alt="sponsor logo">
            </a>
        </div>
      `;
  }

  let contributors = '';
  parameters.contributors.forEach((contributor) => {
    if (contributor.url !== '') {
      contributors +=
        '<a href="' + contributor.url + '">' + contributor.name + '</a>, ';
    } else {
      contributors += contributor.name + ', ';
    }
  });
  contributors = contributors.replace(/,\s*$/, ''); //remove trailing commas

  let copyright = '&copy; ' + year + ' ' + organization;

  let webTitle = parameters.title;

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
      $('title').text(parameters.title);
      $('.dg-homelink').attr('href', homelink);
      $('#dg-title').text(parameters.title);
      $('#dg-owner').html(owner);
      $('#dg-version').text(releaseVersion);
      $('#dg-web-title-version').text('(' + releaseVersion + ')');
      $('#dg-release-date').text(releaseDate);
      $('#dg-web-footer').text(webFooter);
      $('#dg-author').html(author);
      $('#dg-contributors').html(contributors);
      $('#dg-module').text(parameters.module);
      $('#dg-id').html(parameters.id);
      $('#dg-website').html(website);
      $('#dg-backlink').html(backlink);
      $('#headerLeftText').append(sponsorLink);
      $('#dg-summary').text(parameters.summary);
      $('#dg-copyright').html(copyright);
      $('#dg-marking').text(parameters.marking);
      $('#dg-legalese').text(parameters.legalese);
      $('#dg-attribution').text(attribution);
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
