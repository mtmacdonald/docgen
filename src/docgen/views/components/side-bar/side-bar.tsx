// @ts-nocheck
import React from 'react';

const Page = ({ page }) => {
  const name = page.source.substring(0, page.source.lastIndexOf('.'));
  const path = name + '.html';
  return (
    <li>
      <a href={path}>{page.title}</a>
    </li>
  );
};

export const SideBar = ({
  name,
  sortedPages,
  pdfEnabled
}) => {
  const pages = Object.values(sortedPages).flat();
  const pdfName = name.toLowerCase() + '.pdf';
  return (
    <div id="dgSideBar" className="dgSideBarCollapsed">
      <button id="dgSideBarButton">
        <span className="dgIcon" data-name="menu-2"></span>
      </button>
      <div id="dgSideBarInnerWrapper">
        <div id="dgSideBarInner">
          <div id="dgSideBarContent">
            {pages
              .filter((p) => p?.heading !== 'Extra')
              .map((page, i) => (
                <div key={i}>
                  <div className="dgSideBarHeading">{page.heading}</div>
                  <ul>
                    {page.pages.map((subPage, i) => (
                      <Page key={i} page={subPage} />
                    ))}
                  </ul>
                </div>
              ))}
            <div className="dgSideBarAttribution">
              <ul>
                <li>
                <span
                  className="dgIcon"
                  data-name="users"
                  title="ownership"
                ></span>
                  <a href="ownership.html">Ownership</a>
                </li>
                <li>
                <span
                  className="dgIcon"
                  data-name="refresh"
                  title="release notes"
                ></span>
                  <a href="release-notes.html">Release Notes</a>
                </li>
              </ul>
            </div>
            <div className="dgSideBarPDFButton">
              {pdfEnabled && (
                <a
                  className="button"
                  style={{ textDecoration: 'none' }}
                  href={pdfName}
                >
                  PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
