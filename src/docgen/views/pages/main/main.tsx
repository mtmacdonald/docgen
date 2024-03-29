import React, { ReactNode } from 'react';
import { WebFooter } from '../../components/footer/footer';
import { TopBar } from '../../components/top-bar/top-bar';
import { SideBar } from '../../components/side-bar/side-bar';
import { Page } from '../../components/page/page';
import type { Parameters } from '../../../types';

type MainProps = {
  parameters: Parameters;
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
          <div id="dg-innerContent">
            {children}
          </div>
        </section>
        <WebFooter parameters={parameters} />
      </Page>
    </>
  );
};
