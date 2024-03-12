// @ts-nocheck
import React from 'react';

const Page = ({page}) => {
  const name = page.source.substring(0, page.source.lastIndexOf('.'));
  const path = name + '.html';
  return (
    <li><a href={path}>{page.title}</a></li>
  );
};

export const Hamburger = ({
  name,
  sortedPages,
  pdfEnabled
}) => {
  const pages = Object.values(sortedPages).flat();
  const pdfName = name.toLowerCase() + '.pdf';
  return (
    <div id="dgHamburgerMenuContainer">
      <div className="dgHamburgerPageContentBackground"></div>
      <div className="dgHamburgerButton" tabIndex="0">
        <span className="dgHamburgerIconBar"></span>
        <span className="dgHamburgerIconBar"></span>
        <span className="dgHamburgerIconBar"></span>
      </div>
      <div id="dgHamburgerMenuContent" tabIndex="0">
        {pages
          .filter(p => p?.heading !== 'Extra')
          .map((page, i) => (
          <div key={i}>
            <div className="dgHamburgerMenuHeading">{page.heading}</div>
            <ul>
              {page.pages.map((subPage, i) => (
                <Page key={i} page={subPage} />
              ))}
            </ul>
          </div>
        ))}
        <div className="dgHamburgerMenuAttribution">
          <ul>
            <li>
              <span className="dgIcon" data-name="users" title="ownership"></span>
              <a href="ownership.html">Ownership</a>
            </li>
            <li>
              <span className="dgIcon" data-name="refresh" title="release notes"></span>
              <a href="release-notes.html">Release Notes</a>
            </li>
          </ul>
        </div>
        <div className="dgHamburgerMenuPDFButton">
          {true /*pdfEnabled*/ && (
            <a
              className="button"
              style={{textDecoration: 'none'}}
              href={pdfName}
            >
              PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
