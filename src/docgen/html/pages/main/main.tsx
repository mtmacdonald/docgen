import React from 'react';
import { TableOfContents } from '../web-table-of-contents/web-table-of-contents';

const Header = ({parameters}) => {
  const {
    title
  } = parameters;
  return (
    <header>
      <div className="w-fixed-width header-container">
        <div className="header">
          <div className="headerLeftBlock">
            <a className="dg-homelink" href="#">
              <div id="dg-logo"></div>
            </a>
            <div id="headerLeftText">
              <a className="dg-homelink" href="#">
                <span id="dg-title">
                  {title}
                </span> <span id="dg-web-title-version" style={{fontWeight: 'normal'}}></span>
              </a>
            </div>
          </div>
          <div id="headerRightBlock">
            <span id="dg-backlink"></span>
          </div>
        </div>
      </div>
    </header>
  )
};

const Footer = ({parameters}) => {
  const {
    legalese
  } = parameters;
  return (
    <footer>
      <div><p className="w-fixed-width"><span id="dg-web-footer">.</span></p></div>
      <div className="w-fixed-width">
        <p><span id="dg-copyright"></span></p>
        <p>
          <span id="dg-marking"></span>
          <span id="dg-legalese">{legalese}</span>
          <span id="dg-attribution"></span>
        </p>
      </div>
    </footer>
  )
};

export const Main = ({
  parameters,
  sortedPages,
  pdfEnabled,
}) => {
  const {
    name
  } = parameters;
  return (
    <>
      <div id="dg-toc">
        <TableOfContents
          name={name}
          sortedPages={sortedPages}
          pdfEnabled={pdfEnabled}
        />
      </div>
      <div id="dg-navigator">Table of contents</div>
      <Header parameters={parameters} />
      <section id="dg-content">
      </section>
      <Footer parameters={parameters} />
    </>
  );
};
