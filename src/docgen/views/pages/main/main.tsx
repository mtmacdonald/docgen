import React, { ReactNode } from 'react';
import { TableOfContents } from '../../components/web-table-of-contents/web-table-of-contents';
import { Footer } from '../../components/footer/footer';
import type { DerivedParameters } from '../../../types';

const Logo = ({
  parameters,
}) => {
  return (
    parameters?.logoPath && (
      <img
        style={{
          marginRight: '25px',
        }}
        src={parameters?.logoPath}
      />
    )
  )
};

const Header = ({parameters}) => {
  return (
    <header>
      <div className="w-fixed-width header-container">
        <div className="header">
          <div className="headerLeftBlock">
            <a className="dg-homelink" href={parameters.homePagePath}>
              <Logo
                parameters={parameters}
              />
            </a>
            <div id="headerLeftText">
              <a className="dg-homelink" href={parameters.homePagePath}>
                <span id="dg-title">
                  {parameters.title}
                </span>
                <span id="dg-web-title-version" style={{fontWeight: 'normal'}}>
                  {parameters.releaseVersion}
                </span>
              </a>
              <div id="headerSponsor">
                <span>{parameters.sponsorLink.name}</span>
                <a href={parameters.sponsorLink.url}>
                  <img id="sponsorLogo" src={parameters.sponsorLink.logo} alt="sponsor logo" />
                </a>
              </div>
            </div>
          </div>
          <div id="headerRightBlock">
            <span id="dg-backlink"></span>
          </div>
        </div>
      </div>
    </header>
  )
};

const WebFooter = ({parameters}) => {
  return (
    <footer>
      <div>
        <p className="w-fixed-width">
          <span id="dg-web-footer">
            {parameters.webFooter}
          </span>
        </p>
      </div>
      <div className="w-fixed-width">
        <Footer parameters={parameters} />
      </div>
    </footer>
  )
};

type MainProps = {
  parameters: DerivedParameters;
  sortedPages: any;
  pdfEnabled: boolean;
  children?: ReactNode;
};

export const Main = ({
  parameters,
  sortedPages,
  pdfEnabled,
  children,
}: MainProps) => {
  const {
    name
  } = parameters;
  return (
    <>
      <div id="dg-toc">
        <TableOfContents
          name={name}
          sortedPages={sortedPages}
          pdfEnabled={pdfEnabled}
        />
      </div>
      <div id="dg-navigator">Table of contents</div>
      <Header parameters={parameters} />
      <section id="dg-content">
        {children}
      </section>
      <WebFooter parameters={parameters} />
    </>
  );
};
