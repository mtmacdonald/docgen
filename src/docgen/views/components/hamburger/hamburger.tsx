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
  //const pages = Object.values(sortedPages).flat();
  //const pdfName = name.toLowerCase() + '.pdf';
  return (
    <>
      <div id="nav-container">
        <div className="bg"></div>
        <div className="button" tabIndex="0">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </div>
        <div id="nav-content" tabIndex="0">
          <ul>
            <li><a href="#0">Home</a></li>
            <li><a href="#0">Services</a></li>
            <li><a href="#0">Blog</a></li>
            <li><a href="#0">About</a></li>
            <li><a href="#0">Contact</a></li>
            <li className="small"><a href="#0">Facebook</a><a href="#0">Instagram</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
