// @ts-nocheck
import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { TbMenu2, TbX, TbUsers, TbRefresh } from 'react-icons/tb';
import cx from 'classnames';

const SIDEBAR_ICON_SIZE = 24;
const SIDEBAR_SMALL_ICON_SIZE = 20;

const Page = ({ page }) => {
  const name = page.source.substring(0, page.source.lastIndexOf('.'));
  const path = name === 'index' ? '/' : name;
  return (
    <li>
      <Link to={path}>{page.title}</Link>
    </li>
  );
};

export const SideBar = ({
  name,
  sortedPages,
  pdfEnabled
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open)
  const pages = Object.values(sortedPages).flat();
  const pdfName = name.toLowerCase() + '.pdf';
  return (
    <div id="dgSideBar"
         className={cx(
           !open ? 'dgSideBarCollapsed' : '',
         )}
    >
      <button id="dgSideBarButton"
        onClick={toggleOpen}
      >
        <span className="dgIcon">
          {open ? <TbX size={SIDEBAR_ICON_SIZE}/> : <TbMenu2 size={SIDEBAR_ICON_SIZE} />}
        </span>
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
                  title="ownership"
                ></span>
                  <Link to="/ownership"><TbUsers size={SIDEBAR_SMALL_ICON_SIZE} /> Ownership</Link>
                </li>
                <li>
                <span
                  className="dgIcon"
                  title="release notes"
                ></span>
                  <Link to="/release-notes"><TbRefresh size={SIDEBAR_SMALL_ICON_SIZE} /> Release Notes</Link>
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
