import React, { useState, ReactNode } from 'react';
import { WebFooter } from '../../components/footer/footer.tsx';
import { TopBar } from '../../components/top-bar/top-bar.tsx';
import { SideBar } from '../../components/side-bar/side-bar.tsx';
import { Page as PageLayout } from '../../components/page/page.tsx';
import { PDFViewer } from '@react-pdf/renderer';
import type { Parameters } from '../../../types.ts';
import { Pdf } from '../../../pdf/react-pdf/react-pdf.tsx';
import { Outlet } from '@tanstack/react-router';

type MainProps = {
  parameters: Parameters;
  sortedPages: any;
  pdfEnabled: boolean;
};

export const Main = ({
  parameters,
  sortedPages,
  pdfEnabled,
}: MainProps) => {
  const [showPdf, setShowPdf] = useState(false);
  const { name } = parameters;

  return (
    <>
      <TopBar parameters={parameters} onPdfToggle={() => setShowPdf(prev => !prev)} />
      <SideBar
        name={name}
        sortedPages={sortedPages}
        pdfEnabled={pdfEnabled}
      />
      <PageLayout>
        <section id="dg-content" style={{ height: '100%' }}>
          <div id="dg-innerContent" style={{ height: '100%' }}>
            {showPdf ? (
              <PDFViewer width="100%" height="800">
                <Pdf
                  parameters={parameters}
                  options={{}}
                  sortedPages={sortedPages}
                />
              </PDFViewer>
            ) : (
              <Outlet />
              )}
          </div>
        </section>
        <WebFooter parameters={parameters} />
      </PageLayout>
    </>
  );
};
