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

  return (
    <>
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <nav className="menu">
        <div className="dg-hamburger-menu-content">
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
        </div>
      </nav>
    </>
  );
}
