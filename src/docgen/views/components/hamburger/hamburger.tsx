// @ts-nocheck
import React from 'react';

const Page = ({page}) => {
  const name = page.source.substring(0, page.source.lastIndexOf('.'));
  const path = name + '.html';
  return (
    <li><a href={path}>{page.title}</a></li>
  );
};


// Loosely based on https://codepen.io/dannievinther/embed/NvZjvz?height=316&theme-id=0&default-tab=result

export const Hamburger = ({
  name,
  sortedPages,
  pdfEnabled
}) => {
  const pages = Object.values(sortedPages).flat();
  const pdfName = name.toLowerCase() + '.pdf';
  return (
    <div id="nav-container">
      <div className="bg"></div>
      <div className="button" tabIndex="0">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </div>
      <div id="nav-content" tabIndex="0">
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
      </div>
    </div>
  );
}
