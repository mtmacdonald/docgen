This page explains some technical details about how DocGen works.

> You don't need to read these details to use DocGen (they explain how to the tool works internally for advanced users).

# CLI

DocGen is a CLI (command-line interface) tool that is written [TypeScript](https://www.typescriptlang.org/) for
[Node.js](https://nodejs.org/en)

# Markdown

DocGen uses the [markdown-it](https://www.npmjs.com/package/markdown-it) Markdown parser with
[CommonMark](https://commonmark.org/) spec for parsing Markdown content files.

# Website

The website is generated using [React](https://react.dev/) as template engine.

# Styles

DocGen uses [Style Dictionary](https://styledictionary.com) for defining design tokens and generating styles.

The website styles are defined in [Sass](https://sass-lang.com).

The PDF styles are defined in CSS-in-JS format. The React PDF engine uses [Yoga Layout](https://www.yogalayout.dev/),
which supports a print-friendly subset of modern CSS.

# PDF

DocGen uses [ReactPDF](https://react-pdf.org/) as its engine for generating PDF documents, which is built
on [PDFKit](https://pdfkit.org/).

Additionally, DocGen uses the [react-pdf-html](https://www.npmjs.com/package/react-pdf-html) package for converting
Markdown HTML output into React PDF primitives (it internally parses HTML with
[node-html-parser](https://www.npmjs.com/package/node-html-parser) and [CSSTree](https://csstree.github.io/docs/)).
