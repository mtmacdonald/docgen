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
    <>
      <input type="checkbox" id="dgHamburgerMenuToggle" />
      <label htmlFor="dgHamburgerMenuToggle" className="dgHamburgerMenuButton">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <nav className="dgHamburgerMenu">
        <div className="dg-hamburger-menu-content">
          <div>
            {pdfEnabled && (
              <a
                className="button whiteInverted"
                style={{textDecoration: 'none'}}
                href={pdfName}
              >
                PDF
              </a>
            )}
          </div>
          {pages.map((page, i) => (
            <div key={i}>
              <h2>{page.heading}</h2>
              <ul>
                {page.pages.map((subPage, i) => (
                  <Page key={i} page={subPage} />
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2></h2>
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
        </div>
      </nav>
    </>
  );
}
