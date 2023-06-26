const rsvp = require('rsvp');
const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const markdown = require('markdown-it')('commonmark').enable('table');
const moment = require('moment');
import { spawn, exec } from 'child_process';
const schemaValidator = require('z-schema');
const chalk = require('chalk');
const spawnArgs = require('spawn-args');
const cliSpinner = require('cli-spinner').Spinner;
const imageSizeOf = require('image-size');

//Allow CommonMark links that use other protocols, such as file:///
//The markdown-it implementation is more restrictive than the CommonMark spec
//See https://github.com/markdown-it/markdown-it/issues/108
markdown.validateLink = function () {
  return true;
};

/**
 * DocGen class
 */

function DocGen(process) {
  let mainProcess = process;
  let version = '3.0.0';
  let wkhtmltopdfVersion = 'wkhtmltopdf 0.12.6 (with patched qt)'; //output from wkhtmltopdf -V
  let options;
  let templates = {};
  let meta = {};
  let pages = {};
  let sortedPages = {};

  this.getVersion = function () {
    return version;
  };

  this.setOptions = function (userOptions) {
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
    copy the example source files (template) to any directory, when scaffold command is invoked
  */

  this.scaffold = function () {
    console.log(chalk.green('Creating scaffold template directory'));
    copyDirSync(__dirname + '/example', options.output);
  };

  this.run = function () {
    console.log(chalk.green.bold('DocGen version ' + version));
    //delete and recreate the output directory
    remakeDirSync(options.output);
    loadTemplates();
  };

  /*
        read any file (async)
    */

  let readFile = function (path) {
    return new rsvp.Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
          console.log(chalk.red('Error reading file: ' + path));
          reject(error);
        } else {
          data = data.replace(/^\uFEFF/, ''); //remove the BOM (byte-order-mark) from UTF-8 files, if present
          resolve(data);
        }
      });
    });
  };

  /*
        write any file (async)
    */

  let writeFile = function (path, data) {
    return new rsvp.Promise(function (resolve, reject) {
      fs.writeFile(path, data, function (error) {
        if (error) {
          console.log(chalk.red('Error writing file: ' + path));
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  };

  /*
        copy any directory (sync)
    */

  let copyDirSync = function (source, destination) {
    try {
      fs.copySync(source, destination);
    } catch (error) {
      console.log(
        chalk.red('Error copying directory: ' + source + ' to ' + destination),
      );
      if (options.verbose === true) {
        console.log(chalk.red(error));
        mainProcess.exit(1);
      }
    }
  };

  /*
        remake a directory (sync) ... remove and then mkdir in one operation
    */

  let remakeDirSync = function (path) {
    try {
      fs.removeSync(path);
      fs.mkdirpSync(path);
    } catch (error) {
      console.log(chalk.red('Error recreating directory: ' + path));
      if (options.verbose === true) {
        console.log(chalk.red(error));
        mainProcess.exit(1);
      }
    }
  };

  /*
        remove any directory (sync)
    */

  let removeDirSync = function (path) {
    try {
      fs.removeSync(path);
    } catch (error) {
      console.log(chalk.red('Error removing directory: ' + path));
      if (options.verbose === true) {
        console.log(chalk.red(error));
        mainProcess.exit(1);
      }
    }
  };

  /*
        load all HTML template files
    */

  let loadTemplates = function () {
    console.log(chalk.green('Loading templates'));
    let files = {
      main: readFile(__dirname + '/templates/main.html'),
      redirect: readFile(__dirname + '/templates/redirect.html'),
      webCover: readFile(__dirname + '/templates/webCover.html'),
      pdfCover: readFile(__dirname + '/templates/pdfCover.html'),
      pdfHeader: readFile(__dirname + '/templates/pdfHeader.html'),
      pdfFooter: readFile(__dirname + '/templates/pdfFooter.html'),
    };
    rsvp
      .hash(files)
      .then(function (files) {
        for (let key in files) {
          if (files.hasOwnProperty(key)) {
            let file = files[key];
            let dom = cheerio.load(file);
            templates[key] = dom;
          }
        }
        loadMeta();
      })
      .catch(function (error) {
        console.log(chalk.red('Error loading templates'));
        if (options.verbose === true) {
          console.log(chalk.red(error));
        }
        mainProcess.exit(1);
      });
  };

  /*
    JSON schema validation
  */

  let schemas = {
    parameters: {
      title: 'DocGen Parameters Schema',
      type: 'object',
      required: [
        'title',
        'name',
        'version',
        'date',
        'organization',
        'author',
        'owner',
        'contributors',
        'website',
        'module',
        'id',
        'summary',
        'marking',
        'legalese',
      ],
      properties: {
        title: { type: 'string' },
        name: { type: 'string' },
        version: { type: 'string' },
        date: { type: 'string' },
        organization: {
          type: 'object',
          required: ['name', 'url'],
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        author: {
          type: 'object',
          required: ['name', 'url'],
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        owner: {
          type: 'object',
          required: ['name', 'url'],
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        contributors: {
          type: 'array',
          items: {
            oneOf: [
              {
                type: 'object',
                required: ['name', 'url'],
                properties: {
                  name: { type: 'string' },
                  url: { type: 'string' },
                },
              },
            ],
          },
        },
        website: {
          type: 'object',
          required: ['name', 'url'],
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        backlink: {
          type: 'object',
          required: ['name', 'url'],
          properties: {
            name: { type: 'string' },
            url: { type: 'string' },
          },
        },
        module: { type: 'string' },
        id: { type: 'string' },
        summary: { type: 'string' },
        marking: { type: 'string' },
        legalese: { type: 'string' },
      },
    },
    contents: {
      title: 'DocGen Table of Contents Schema',
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'object',
            required: ['heading', 'column', 'pages'],
            properties: {
              name: { type: 'string' },
              column: { type: 'integer', minimum: 1, maximum: 4 },
              pages: {
                type: 'array',
                items: {
                  oneOf: [
                    {
                      type: 'object',
                      required: ['title', 'source'],
                      properties: {
                        title: { type: 'string' },
                        source: { type: 'string' },
                        html: { type: 'boolean' },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };

  let validateJSON = function (key, data) {
    let schema = schemas[key];
    let validator = new schemaValidator();
    let valid = validator.validate(data, schema);
    if (!valid) {
      console.log(
        chalk.red(
          'Error parsing required file: ' +
            key +
            '.json (failed schema validation)',
        ),
      );
      if (options.verbose === true) {
        console.log(chalk.red(validator.getLastError()));
      }
    }
    return valid;
  };

  /*
    load all metadata files (JSON)
  */

  let loadMeta = function () {
    console.log(chalk.green('Loading required JSON metadata files'));
    let files = {
      parameters: readFile(options.input + '/parameters.json'),
      contents: readFile(options.input + '/contents.json'),
    };
    rsvp
      .hash(files)
      .then(function (files) {
        for (let key in files) {
          if (files.hasOwnProperty(key)) {
            //ignore prototype
            try {
              let file = JSON.parse(files[key]);
              if (validateJSON(key, file)) {
                meta[key] = file;
              } else {
                mainProcess.exit(1);
              }
            } catch (error) {
              console.log(
                chalk.red(
                  'Error parsing required file: ' +
                    key +
                    '.json (invalid JSON)',
                ),
              );
              if (options.verbose === true) {
                console.log(chalk.red(error));
              }
              mainProcess.exit(1);
            }
          }
        }
        //add the release notes to the contents list
        let extra = {
          heading: 'Extra',
          column: 5,
          pages: [{ title: 'Release notes', source: 'release-notes.txt' }],
        };
        meta.contents.push(extra);
        loadMarkdown();
      })
      .catch(function (error) {
        console.log(chalk.red('Error loading required JSON metadata files'));
        if (options.verbose === true) {
          console.log(chalk.red(error));
        }
        mainProcess.exit(1);
      });
  };

  /*
    load all markdown files (source)
  */

  let loadMarkdown = function () {
    console.log(chalk.green('Loading source files'));
    let keys = [];
    let files = [];
    meta.contents.forEach(function (section) {
      section.pages.forEach(function (page) {
        keys.push(page);
        files.push(options.input + '/' + page.source);
      });
    });
    //add the release notes page
    keys.push('ownership');
    files.push(options.input + '/release-notes.txt');
    rsvp
      .all(files.map(readFile))
      .then(function (files) {
        files.forEach(function (page, index) {
          try {
            let key = keys[index];
            if (key.html === true) {
              //allow raw HTML input pages
              pages[key.source] = page;
            } else {
              //otherwise parse input from Markdown into HTML
              let html = markdown.render(page);
              pages[key.source] = html;
            }
          } catch (error) {
            console.log(
              chalk.red('Error parsing Markdown file: ' + file.source),
            );
            if (options.verbose === true) {
              console.log(chalk.red(error));
            }
            mainProcess.exit(1);
          }
        });
        processContent();
      })
      .catch(function (error) {
        console.log(chalk.red('Error loading source files'));
        if (options.verbose === true) {
          console.log(chalk.red(error));
        }
        mainProcess.exit(1);
      });
  };

  let sortPages = function () {
    //sort the contents by heading
    let headings = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    meta.contents.forEach(function (section) {
      if (headings.hasOwnProperty(section.column)) {
        headings[section.column].push(section);
      }
    });
    sortedPages = headings;
  };

  /*
    build the HTML for the table of contents
  */

  let webToc = function () {
    sortPages();
    let pdfName = meta.parameters.name.toLowerCase() + '.pdf';
    let $ = templates.main;
    let html = [],
      i = -1;
    html[++i] = '<div><table class="unstyled"><tr>';
    //build the contents HTML
    for (let key in sortedPages) {
      if (sortedPages.hasOwnProperty(key)) {
        if (key != 5) {
          //skip the extra column
          html[++i] = '<td class="dg-tocGroup">';
          sortedPages[key].forEach(function (section) {
            html[++i] =
              '<ul><li class="dg-tocHeading">' + section.heading + '</li>';
            section.pages.forEach(function (page) {
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
    if (options.pdf) {
      html[++i] =
        '<button class="w-icon-button" onclick="window.location=\'' +
        pdfName +
        '\';">';
      html[++i] = '<span class="w-icon" data-name="document"></span>';
      html[++i] = '<span>PDF copy</span>';
      html[++i] = '</button>';
    }
    html[++i] = '</div></td>';
    html[++i] = '</tr></table></div>';
    $('#dg-toc').html(html.join(''));
    templates.main = $;
  };

  /*
    insert the parameters into all templates
  */

  let insertParameters = function () {
    //------------------------------------------------------------------------------------------------------
    //logo dimensions
    let hasLogo = false;
    let logoWidth = 0;
    let logoHeight = 0;
    try {
      let logo = imageSizeOf(options.input + '/files/images/logo.png');
      logoWidth = logo.width;
      logoHeight = logo.height;
      hasLogo = true;
    } catch (error) {
      //do nothing. If logo file cannot be read, logo is simply not shown
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
        '<a href="' +
        meta.parameters.backlink.url +
        '">' +
        meta.parameters.backlink.name +
        '</a>';
    } else {
      backlink += meta.parameters.backlink.name;
    }

    let contributors = '';
    meta.parameters.contributors.forEach(function (contributor) {
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
          let logoUrl = 'files/images/logo.png';
          $('#dg-logo').css('background-image', 'url(' + logoUrl + ')');
          $('#dg-logo').css('height', logoHeight + 'px');
          $('#dg-logo').css('line-height', logoHeight + 'px');
          $('#dg-logo').css('padding-left', logoWidth + 25 + 'px');
        } else {
          $('#dg-logo').css('padding-left', '0');
        }
        //parameters
        $('title').text(meta.parameters.title);
        $('#dg-homelink').attr('href', homelink);
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
      $('head').append(
        '<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"></script>',
      );
    }
  };

  /*
    process each input into an output
  */

  let processContent = function () {
    console.log(chalk.green('Generating the static web content'));
    webToc();
    insertParameters();
    meta.contents.forEach(function (section) {
      section.pages.forEach(function (page) {
        let $ = cheerio.load(templates.main.html()); //clone
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
        headings.each(function (index) {
          let label = $(this).text();
          let anchor = label.toLowerCase().replace(/\s+/g, '-');
          $(this).attr('id', anchor);
          html[++i] = '<li><a href="#' + anchor + '">' + label + '</a></li>';
        });
        if (headings.length > 0) {
          html[++i] = '</ul>';
        }
        if (options.pageToc === true && page.html !== true) {
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
    let $ = cheerio.load(templates.main.html()); //clone
    $('#dg-content').html(
      '<div class="w-fixed-width"><div id="dg-innerContent"></div></div>',
    );
    $('#dg-innerContent').html(templates.webCover.html());
    templates.webCover = $;
    writePages();
  };

  /*
    write each html page
  */

  let writePages = function () {
    console.log(chalk.green('Writing the web page files'));
    let promises = {};
    meta.contents.forEach(function (section) {
      section.pages.forEach(function (page) {
        let key = page.source;
        let name = key.substr(0, page.source.lastIndexOf('.'));
        let path = options.output + name + '.html';
        let html = pages[key].html();
        promises[key] = writeFile(path, html);
      });
    });
    //add extra files
    promises['ownership'] = writeFile(
      options.output + 'ownership.html',
      templates.webCover.html(),
    );
    if (options.pdf === true) {
      let pdfTempDir = options.output + 'temp/';
      fs.mkdirsSync(pdfTempDir);
      promises['docgenPdfCover'] = writeFile(
        pdfTempDir + 'pdfCover.html',
        templates.pdfCover.html(),
      );
      promises['docgenPdfHeader'] = writeFile(
        pdfTempDir + 'pdfHeader.html',
        templates.pdfHeader.html(),
      );
      promises['docgenPdfFooter'] = writeFile(
        pdfTempDir + 'pdfFooter.html',
        templates.pdfFooter.html(),
      );
    }
    rsvp
      .hash(promises)
      .then(function (files) {
        copyDirSync(__dirname + '/require', options.output + 'require'); //CSS, JavaScript
        copyDirSync(options.input + '/files', options.output + 'files'); //user-attached files and images
        if (options.mathKatex === true) {
          copyDirSync(
            __dirname + '/optional/katex',
            options.output + 'require/katex',
          );
        }
        checkPdfVersion();
      })
      .catch(function (error) {
        console.log(chalk.red('Error writing the web page files'));
        if (options.verbose === true) {
          console.log(chalk.red(error));
        }
        mainProcess.exit(1);
      });
  };

  /*
    wkthmltopdf options
  */

  let pdfOptions = [
    ' --zoom 1.0',
    ' --image-quality 100',
    ' --print-media-type',
    ' --orientation portrait',
    ' --page-size A4',
    ' --margin-top 25',
    ' --margin-right 15',
    ' --margin-bottom 16',
    ' --margin-left 15',
    ' --header-spacing 5',
    ' --footer-spacing 5',
    ' --no-stop-slow-scripts',
  ];

  let getPdfArguments = function () {
    let pdfName = meta.parameters.name.toLowerCase() + '.pdf';
    pdfOptions.push(' --enable-local-file-access');
    pdfOptions.push(' --javascript-delay ' + options.pdfDelay); //code syntax highlight in wkhtmltopdf 0.12.2.1 fails without a delay (but why doesn't --no-stop-slow-scripts work?)
    pdfOptions.push(' --user-style-sheet ' + __dirname + '/pdf-stylesheet.css');
    pdfOptions.push(' --header-html ' + options.output + 'temp/pdfHeader.html');
    pdfOptions.push(' --footer-html ' + options.output + 'temp/pdfFooter.html');
    pdfOptions.push(' cover ' + options.output + 'temp/pdfCover.html');
    pdfOptions.push(
      ' toc --xsl-style-sheet ' + __dirname + '/pdf-contents.xsl',
    );
    let allPages = '';
    for (let key in sortedPages) {
      if (sortedPages.hasOwnProperty(key)) {
        sortedPages[key].forEach(function (section) {
          section.pages.forEach(function (page) {
            let key = page.source;
            let name = key.substr(0, page.source.lastIndexOf('.'));
            let path = options.output + name + '.html';
            allPages += ' ' + path;
          });
        });
      }
    }
    let args = pdfOptions.join('');
    args += allPages;
    args += ' ' + options.output + pdfName;
    return spawnArgs(args);
  };

  let checkPdfVersion = function () {
    if (options.pdf === true) {
      //first check that wkhtmltopdf is installed
      exec(options.wkhtmltopdfPath + ' -V', function (error, stdout, stderr) {
        if (error) {
          console.log(
            chalk.red(
              'Unable to call wkhtmltopdf. Is it installed and in path? See http://wkhtmltopdf.org',
            ),
          );
          if (options.verbose === true) {
            console.log(chalk.red(error));
          }
          mainProcess.exit(1);
        } else {
          //warn if the version of wkhtmltopdf is not an expected version
          let actualWkhtmltopdfVersion = stdout.trim();
          if (actualWkhtmltopdfVersion !== wkhtmltopdfVersion) {
            let warning =
              'Warning: unexpected version of wkhtmltopdf, which may work but is not tested or supported';
            let expectedVersion = '   expected version: ' + wkhtmltopdfVersion;
            let detectedVersion =
              '   detected version: ' + actualWkhtmltopdfVersion;
            console.log(chalk.yellow(warning));
            console.log(chalk.yellow(expectedVersion));
            console.log(chalk.yellow(detectedVersion));
          }
          generatePdf();
        }
      });
    } else {
      cleanUp();
    }
  };

  /*
    call wkhtmltopdf as an external executable
  */

  let generatePdf = function () {
    console.log(chalk.green('Creating the PDF copy (may take some time)'));
    let args = getPdfArguments();
    let wkhtmltopdf = spawn(options.wkhtmltopdfPath, args);
    let spinner = new cliSpinner(chalk.green('   Processing... %s'));
    spinner.setSpinnerString('|/-\\');

    wkhtmltopdf.on('error', function (error) {
      console.log(chalk.red('Error calling wkhtmltopdf to generate the PDF'));
      if (options.verbose === true) {
        console.log(chalk.red(error));
      }
    });

    if (options.verbose !== true) {
      spinner.start(); //only show spinner when verbose is off (otherwise show raw wkhtmltopdf output)
    } else {
      //pipe the output from wkhtmltopdf back to stdout
      //however, wkhtmltpdf outputs to stderr, not stdout. See:
      //https://github.com/wkhtmltopdf/wkhtmltopdf/issues/1980
      wkhtmltopdf.stderr.pipe(mainProcess.stdout);
    }

    wkhtmltopdf.stdout.on('data', function (data) {
      //do nothing
    });

    wkhtmltopdf.stderr.on('data', function (data) {
      //do nothing
    });

    wkhtmltopdf.on('close', function (code) {
      if (options.verbose !== true) {
        spinner.stop();
        console.log(''); //newline after spinner stops
      }
      if (code !== 0) {
        let warning =
          'wkhtmltopdf exited with a warning or error: try the -v option for details';
        console.log(chalk.yellow(warning));
      }
      cleanUp();
    });
  };

  let createRedirect = function () {
    if (options.redirect) {
      let parent = options.output.replace(/\/$/, ''); //trim any trailing slash
      parent = parent.split(path.sep).slice(-1).pop(); //get name of final directory in the path
      let homepage = meta.contents[0].pages[0];
      homepage =
        homepage.source.substr(0, homepage.source.lastIndexOf('.')) + '.html';
      let redirectLink = parent + '/' + homepage;
      let $ = templates.redirect;
      $('a').attr('href', redirectLink);
      $('meta[http-equiv=REFRESH]').attr('content', '0;url=' + redirectLink);
      let file = options.output + '../' + 'index.html';
      try {
        fs.outputFileSync(file, $.html(), 'utf-8');
      } catch (error) {
        console.log(chalk.red('Error writing redirect file: ' + file));
        if (options.verbose === true) {
          console.log(chalk.red(error));
        }
        //don't exit because redirect error is not a fatal error
      }
    }
  };

  /*
    cleanup
  */

  let cleanUp = function () {
    createRedirect();
    //remove temp files
    if (options.pdf === true) {
      removeDirSync(options.output + 'temp');
    }
    console.log(chalk.green.bold('Done!'));
  };
}

module.exports = DocGen;
