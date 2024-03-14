import React, { ReactNode } from 'react';
import { Footer } from '../../components/footer/footer';
import { TopBar } from '../../components/top-bar/top-bar';
import { SideBar } from '../../components/side-bar/side-bar';
import { Page } from '../../components/page/page';
import type { Parameters } from '../../../types';

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
  parameters: Parameters;
  sortedPages: any;
  pdfEnabled: boolean;
  fixedWidth?: boolean;
  children?: ReactNode;
};

export const Main = ({
  parameters,
  sortedPages,
  pdfEnabled,
  fixedWidth,
  children,
}: MainProps) => {
  const {
    name
  } = parameters;
  return (
    <>
      <TopBar
        parameters={parameters}
      />
      <SideBar
        name={name}
        sortedPages={sortedPages}
        pdfEnabled={pdfEnabled}
      />
      <Page>
        <section id="dg-content">
          {fixedWidth ? (
            <div className="w-fixed-width">
              <div id="dg-innerContent">
                {children}
              </div>
            </div>
          ) : (
            <div id="dg-innerContent">
              {children}
            </div>
          )}
        </section>
        <WebFooter parameters={parameters} />
      </Page>
    </>
  );
};
