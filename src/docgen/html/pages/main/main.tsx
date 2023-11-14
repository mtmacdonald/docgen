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
              <div id="headerSponsor">
                <span>{parameters.sponsorLink.name}</span>
                <a href={parameters.sponsorLink.url}>
                  <img id="sponsorLogo" src={parameters.sponsorLink.logo} alt="sponsor logo" />
                </a>
              </div>
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
  return (
    <footer>
      <div><p className="w-fixed-width"><span id="dg-web-footer">.</span></p></div>
      <div className="w-fixed-width">
        <p>
          <span id="dg-copyright">
            &copy; {parameters.year} &nbsp;
            {parameters?.organization?.url ? (
              <a href={parameters.organization.url}>{parameters.organization.name}</a>
            ) : parameters?.organization?.nmee ? (
              <span>parameters.organization.name</span>
            ) : null}
          </span>
        </p>
        <p>
          <span id="dg-marking">{parameters.marking}</span>
          <span id="dg-legalese">{parameters.legalese}</span>
          <span id="dg-attribution">{parameters.attribution}</span>
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
