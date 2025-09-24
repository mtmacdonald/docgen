import React from 'react';
import { WebFooter } from '../../components/footer/footer.tsx';
import { TopBar } from '../../components/top-bar/top-bar.tsx';
import { SideBar } from '../../components/side-bar/side-bar.tsx';
import { Page } from '../../components/page/page.tsx';
import { PDFViewer } from '@react-pdf/renderer';
import type { TParameters } from '../../../../docgen/types.ts';
import { Pdf } from '../../../pdf/react-pdf/react-pdf.tsx';
import { Outlet, useRouterState } from '@tanstack/react-router';

type MainProps = {
  parameters: TParameters;
  sortedPages: any;
  pdfEnabled: boolean;
};

export const Main = ({ parameters, sortedPages, pdfEnabled }: MainProps) => {
  const pdfVisible = useRouterState({
    select: (s) => s.location.pathname === '/pdf',
  });

  const { name } = parameters;

  return (
    <>
      <TopBar parameters={parameters} />
      <SideBar name={name} sortedPages={sortedPages} pdfEnabled={pdfEnabled} />
      <Page>
        <section id="dg-content">
          <div id="dg-innerContent">
            {pdfVisible ? (
              <PDFViewer width="100%" height={800}>
                <Pdf parameters={parameters} options={{}} sortedPages={sortedPages} />
              </PDFViewer>
            ) : (
              <Outlet />
            )}
          </div>
        </section>
        <WebFooter parameters={parameters} />
      </Page>
    </>
  );
};
