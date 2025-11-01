import React from 'react';
import { WebFooter } from '../../components/footer/footer.tsx';
import { TopBar } from '../../components/top-bar/top-bar.tsx';
import { SideBar } from '../../components/side-bar/side-bar.tsx';
import { Page } from '../../components/page/page.tsx';
import { PDFViewer } from '../../../pdf/react-pdf/pdf-viewer.tsx';
import type { TParameters } from '../../../../docgen/types.ts';
import { Pdf } from '../../../pdf/react-pdf/react-pdf.tsx';
import { Outlet, useRouterState } from '@tanstack/react-router';
import { pdfRoute } from '../../router.tsx';

type MainProps = {
  parameters: TParameters;
  sortedPages: any;
  pdfEnabled: boolean;
};

export const Main = ({ parameters, sortedPages, pdfEnabled }: MainProps) => {
  const pdfVisible = useRouterState({
    select: (state) => state.location.pathname.endsWith(pdfRoute.path),
  });
  return (
    <>
      <TopBar parameters={parameters} />
      <SideBar sortedPages={sortedPages} pdfEnabled={pdfEnabled} />
      <Page>
        <section id="dg-content">
          <div id="dg-innerContent">
            {pdfVisible ? (
              <PDFViewer >
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
