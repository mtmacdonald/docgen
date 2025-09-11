import React from 'react';
import { Link } from '@tanstack/react-router';
import { TbFile, TbFileOff } from 'react-icons/tb';

const Logo = ({ parameters }) => {
  return (
    parameters?.logoPath && (
      <img
        style={{ marginRight: '25px' }}
        src={parameters?.logoPath}
        alt="logo"
      />
    )
  );
};

export const TopBar = ({ parameters, pdfVisible, onPdfToggle }) => {
  return (
    <div>
      <div className="topbar">
        <div className="left">
          <Link className="dg-homelink" to="/">
            <Logo parameters={parameters} />
          </Link>
          <div id="headerLeftText">
            <a className="dg-homelink" href={parameters.homePagePath}>
              <span id="dg-title">{parameters.title}</span>
              <span id="dg-web-title-version" style={{ fontWeight: 'normal' }}>
                &nbsp;({parameters.version})
              </span>
            </a>
            {parameters?.sponsorLink?.name && (
              <div id="headerSponsor">
                <span>{parameters.sponsorLink.name}</span>
                <a href={parameters.sponsorLink.url}>
                  <img
                    id="sponsorLogo"
                    src={parameters.sponsorLink.logo}
                    alt="sponsor logo"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
        <div
          className="right"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <button
            className={`button ${pdfVisible ? '' : 'inverted'}`}
            onClick={onPdfToggle}
            title="Toggle PDF"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {pdfVisible ? (
              <TbFile size={18} className="icon" />
            ) : (
              <TbFileOff size={18} className="icon" />
            )}
            <span>PDF</span>
          </button>
          <span id="dg-backlink">
            {parameters.backlink.url && (
              <a className="button inverted" href={parameters.backlink.url}>
                {parameters.backlink.name}
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
