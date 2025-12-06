import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { TbMenu2, TbX, TbUsers, TbRefresh } from 'react-icons/tb';
import cx from 'classnames';
import { PdfToggleButton } from '../pdf-toggle-button/pdf-toggle-button.tsx';
import type { TSortedPages } from '../../../../docgen/types.ts';

const SIDEBAR_ICON_SIZE = 24;
const SIDEBAR_SMALL_ICON_SIZE = 20;

const Page = ({ page, onLinkClick }) => {
  const name = page.source.substring(0, page.source.lastIndexOf('.'));
  const path = name === 'index' ? '/' : name;
  return (
    <li>
      <Link to={path} onClick={onLinkClick}>
        {page.title}
      </Link>
    </li>
  );
};

export type TSideBarProps = {
  sortedPages: TSortedPages;
  pdfEnabled: boolean;
};

export const SideBar = ({ sortedPages, pdfEnabled }: TSideBarProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);

  const pages = Object.values(sortedPages).flat();

  return (
    <div id="dgSideBar" className={cx(!open ? 'dgSideBarCollapsed' : '')}>
      <button id="dgSideBarButton" onClick={toggleOpen}>
        <span className="dgIcon">
          {open ? (
            <TbX size={SIDEBAR_ICON_SIZE} />
          ) : (
            <TbMenu2 size={SIDEBAR_ICON_SIZE} />
          )}
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
                      <Page key={i} page={subPage} onLinkClick={close} />
                    ))}
                  </ul>
                </div>
              ))}

            <div className="dgSideBarAttribution">
              <ul>
                <li>
                  <span className="dgIcon" title="ownership"></span>
                  <Link to="/ownership" onClick={close}>
                    <TbUsers size={SIDEBAR_SMALL_ICON_SIZE} /> Ownership
                  </Link>
                </li>
                <li>
                  <span className="dgIcon" title="release notes"></span>
                  <Link to="/release-notes" onClick={close}>
                    <TbRefresh size={SIDEBAR_SMALL_ICON_SIZE} /> Release Notes
                  </Link>
                </li>
              </ul>
            </div>

            {pdfEnabled && (
              <div className="dgSideBarPDFButton">
                <PdfToggleButton onClick={close} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
