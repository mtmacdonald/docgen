// @ts-nocheck
import React from 'react';

const Logo = ({ parameters }) => {
  return (
    parameters?.logoPath && (
      <img
        style={{
          marginRight: '25px',
        }}
        src={parameters?.logoPath}
      />
    )
  );
};

export const TopBar = ({ parameters }) => {
  return (
    <div>
      <div className="topbar">
        <div className="left">
          <a className="dg-homelink" href={parameters.homePagePath}>
            <Logo parameters={parameters} />
          </a>
          <div id="headerLeftText">
            <a className="dg-homelink" href={parameters.homePagePath}>
              <span id="dg-title">{parameters.title}</span>
              <span id="dg-web-title-version" style={{ fontWeight: 'normal' }}>
                &nbsp;({parameters.version})
              </span>
            </a>
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
          </div>
        </div>
        <div className="right">
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
