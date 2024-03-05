import React from 'react';

export const Hamburger = ({
  name,
  sortedPages,
  pdfEnabled
}) => {

  const pages = Object.values(sortedPages).flat();
  console.log(pages);

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
          <ul>
            {pages.map((p, i) => (
              // @ts-ignore
              <li key={i}><a href="#">{p?.heading}</a></li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
