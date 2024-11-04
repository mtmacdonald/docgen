<style>

:root {
  --margin-card: 32px;
  --width-card: 260px;
}

@media (min-width: 1200px) {
  h1 {
    font-size: 64px;
    letter-spacing: -0.025em;
    line-height: 1.15;
  }
}

h2 {
  font-size: 28px;
}

h3 {
  font-size: 24px;
}

.lead {
  font-size: 20px;
  line-height: 28px;
  margin: 0 0 20px 0;
}

.section {
  padding: 32px 0;
  margin: 0;
}

@media (min-width: 1200px) {
  .section {
    padding: 64px 0;
  }
}

.banner {
  --banner-image-width: 50%;
  padding: 72px 0;
  position: relative;
}

.bannerImage {
  max-width: 100%;
  margin: 20px 0;
}

.bannerButtons > * {
  margin-right: 16px;
  margin-bottom: 16px;
}

@media (min-width: 1200px) {
  .banner {
    padding-right: calc(var(--banner-image-width) + 100px);
  }
  .bannerImage {
    position: absolute;
    width: var(--banner-image-width);
    height: auto;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
  }
}

.howItWorksDetails {
    text-align:left;
    display: inline-block;
    vertical-align: top;
    width: var(--width-card);
    margin-right: var(--margin-card);
}
.howItWorksDetails img {
  border-radius: 12px;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
}

.features {
  margin: 0;
  padding: 0;
  width: 100%;
}
.features li {
  vertical-align: top;
  display: inline-block;
  width: var(--width-card);
  margin-right: var(--margin-card);
  margin-top: var(--margin-card);
}
.features li img {
  height: 44px;
  margin-bottom: 8px;
}
.features li span {
  vertical-align: middle;
  margin-right: 5px;
}
.features h4 {
  margin-bottom: 0;
}

.featureDetails {
  display: inline-block;
  vertical-align: top;
  width: var(--width-card);
  margin-right: var(--margin-card);
}

.browsers {
  margin: 40px 0;
}
.browsers a {
  display: inline-block;
  vertical-align: top;
  width: 80px;
  margin-right: var(--margin-card);
  text-align: center;
  text-decoration: none;
  transition: opacity 0.2s;
}
.browsers a:hover {
  opacity: 0.7;
}
.browsers a img {
  height: 60px;
}
.browsers a p {
  margin: 8px;
}

.inkitSponsor {
  max-width: 100%;
  overflow: hidden;
  background-image: url('files/images/inkit-dark-background.png');
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  color: white;
  opacity: 0.9;
  padding: 32px;
  text-align: left;
}
.inkitSponsor a, .inkitSponsor h3 {
  color: white;
}
.inkitSponsor h3 {
  color: white;
  line-height: 1.2;
  margin-bottom: 0;
}
.inkitSponsor p {
  margin-top: 0;
}
.inkitSponsor img {
  width: var(--width-card);
  max-width: 100%;
  margin-bottom: var(--margin-card);
}
@media (min-width: 800px) {
  .inkitSponsor {
    padding: 60px;
  }
  .inkitSponsor img {
    float: left;
    box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.3);
    margin-right: var(--margin-card);
    margin-bottom: 0;
  }
}
</style>

<div class="section banner">
  <h1 class="headline">The Leading Open Source Documentation Tool</h1>
  <p class="lead">
   DocGen generates HTML websites and PDF documents from plain text for free.
  </p>
  <img src="files/images/overview.svg"  alt="overview" width="700px" class="bannerImage" />
  <div class="bannerButtons">
    <a href="https://github.com/mtmacdonald/docgen/tags" class="button spaced">
      <span>Download</span>
      <img class="icon" src="files/images/icons/arrowRight.svg" alt="arrow">
    </a>
    <a href="https://github.com/mtmacdonald/docgen/issues" class="button inverted">Report Issues</a>
  </div>
</div>

<div class="section">
  <div>
    <h2>DocGen is a Static Website Generator</h2>
    <p>
      DocGen is an open-source website generator that makes it easy to create high-quality documentation.
    </p>
  </div>
  <h2 class="dg-hiddenTitle" id="features">Features</h2>
  <ul class="features">
  <li>
    <img src="files/images/icons/computer.svg" />
    <h4>Self-contained website</h4>
    <p>Creates a static website that works on any server, or as local files.</p>
  </li>
  <li>
    <img src="files/images/icons/pdf.svg" />
    <h4>Optional PDF</h4>
    <p>Also publishes the website content as a single PDF, using <a href="https://react-pdf.org/">React-pdf</a>.</p>
  </li>
  <li>
    <img src="files/images/icons/pencil.svg" />
    <h4>Human-friendly input</h4>
    <p>Write in plain text, or the human-friendly <a href="http://commonmark.org">Markdown</a> format.</p>
  </li>
  <li>
    <img src="files/images/icons/cog.svg" />
    <h4>Easy to version control</h4>
    <p>Plain text input formats work well with all version control systems.</p>
  </li>
  <li>
    <img src="files/images/icons/document.svg" />
    <h4>Table of contents</h4>
    <p>Automatically creates tables of contents, with links and PDF page numbers.</p>
  </li>
  <li>
    <img src="files/images/icons/code.svg" />
    <h4>Code syntax highlighting</h4>
    <p>Automatically highlights code blocks, using <a href="https://highlightjs.org">Highlight.js</a>, with language detection.</p>
  </li>
  <li>
    <img src="files/images/icons/box.svg" />
    <h4>Mathematical expressions</h4>
    <p>Displays mathematical expressions without plugins, using either
    <a href="http://khan.github.io/KaTeX/">KaTeX</a> or
    <a href="https://www.mathjax.org">MathJax</a>.</p>
  </li>
  <li>
    <img src="files/images/icons/star.svg" />
    <h4>Branding and metadata</h4>
    <p>Easily brand with a logo, attribute ownership, and attach release notes.</p>
  </li>
  </ul>
</div>

<div class="section dg-forceBreak">
  <h2>Sponsors</h2>
  <div class="inkitSponsor">
    <img src="files/images/inkit-screenshot.png" alt="Inkit sponsor">
      <h3>DocGen is sponsored by Inkit</h3>
      <p>
        DocGen is open-source software sponsored by Inkit, the leading Zero Trust Document Generation Platform.
      </p>
      <a href="https://www.inkit.com" class="button whiteInverted">Learn More</a>
  </div>
</div>

<div class="section">
  <h2>How it works</h2>
  <p>
    Simply <a href="https://github.com/mtmacdonald/docgen/releases">download</a> or <a href="#quick-start">install</a> DocGen, and run the tool to generate websites and PDF documents.
  </p>
  <div>
    <div class="howItWorksDetails">
      <img src="files/images/text.png" alt="text" />
      <p>001 | <strong>Create content in plain text or human-friendly <a href="http://commonmark.org">Markdown</a></strong></p>
    </div>
    <div class="howItWorksDetails">
      <img src="files/images/web.png" alt="website" />
      <p>002 | <strong>DocGen styles and publishes all your content as a website</strong></p>
    </div>
    <div class="howItWorksDetails">
      <img src="files/images/pdf.png" alt="pdf" />
      <p>003 | <strong>DocGen also creates an equivalent PDF copy</strong></p>
    </div>
  </div>
  <div class="featureDetails">
    <strong>Flexible Input Formats</strong>
    <ul>
      <li>Plain text</li>
      <li>CommonMark (Markdown)</li>
      <li>HTML</li>
      <li>LaTeX mathematical expressions</li>
      <li>Image diagrams</li>
      <li>Attach other documents</li>
    <ul>
  </div>
  <div class="featureDetails">
    <strong>Configurable Metadata</strong>
    <ul>
      <li>Branding (logo, title, organization)</li>
      <li>License, copyright, and legal markings</li>
      <li>Ownership and attribution</li>
      <li>Version information</li>
      <li>Release notes (change log)</li>
    </ul>
  </div>
  <blockquote>
  NOTE: DocGen is intended for free-form, human-generated content which is regularly updated and improved, then
  automatically laid out according to a template. It is not intended as a precision PDF editing tool.
  </blockquote>
</div>

<div class="section dg-forceBreak">
  <h2>Browser support</h2>
  <p>
    Websites and documents generated by DocGen work in most browsers
    including Chrome, Edge, Firefox and Safari.
  </p>
  <div class="browsers">
    <a href="https://www.google.com/chrome">
      <img src="files/images/icons/chrome.png" alt="chrome" />
      <p>Chrome</p>
    </a>
    <a href="https://www.microsoft.com/en-us/edge">
      <img src="files/images/icons/edge.png" alt="edge" />
      <p>Edge</p>
    </a>
    <a href="https://www.mozilla.org/en-US/firefox/new">
      <img src="files/images/icons/firefox.png" alt="firefox" />
      <p>Firefox</p>
    </a>
    <a href="https://www.apple.com/safari">
      <img src="files/images/icons/safari.png" alt="safari" />
      <p>Safari</p>
    </a>
  </div>
</div>

<div class="section">
  <h2 id="quick-start">Quick start</h2>
  <p>In just three steps:</p>
  <ol>
    <li><strong>Install DocGen</strong></li>
    <li><strong>Scaffold an empty template</strong></li>
    <li><strong>Generate a static website</strong></li>
  </ol>
  <p>Simply enter these commands in the terminal:</p>
  <pre><code>npm install -g docgen-tool
docgen scaffold
docgen run -o $HOME/docgen-example</code></pre>
  <p>
    <strong>
      See the <a href="installation.html">installation guide</a> for more detailed instructions.
    </strong>
  </p>
</div>


