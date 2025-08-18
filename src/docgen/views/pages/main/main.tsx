import React, { useState } from 'react';
import { WebFooter } from '../../components/footer/footer.tsx';
import { TopBar } from '../../components/top-bar/top-bar.tsx';
import { SideBar } from '../../components/side-bar/side-bar.tsx';
import { Page } from '../../components/page/page.tsx';
import { PDFViewer } from '@react-pdf/renderer';
import type { Parameters } from '../../../types.ts';
import { Pdf } from '../../../pdf/react-pdf/react-pdf.tsx';
import { Outlet } from '@tanstack/react-router';

type MainProps = {
  parameters: Parameters;
  sortedPages: any;
  pdfEnabled: boolean;
};

export const Main = ({ parameters, sortedPages, pdfEnabled }: MainProps) => {
  const [pdfVisible, setPdfVisible] = useState(false);
  const onTogglePdf = () => setPdfVisible(!pdfVisible);
  const { name } = parameters;

  return (
    <>
      <TopBar parameters={parameters} onPdfToggle={onTogglePdf} pdfVisible={pdfVisible} />
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
