import React from 'react';
import { WebFooter } from '../../components/footer/footer.tsx';
import { TopBar } from '../../components/top-bar/top-bar.tsx';
import { SideBar } from '../../components/side-bar/side-bar.tsx';
import { Page } from '../../components/page/page.tsx';
import type { TParameters } from '../../../../docgen/types.ts';
import { Outlet, useRouterState } from '@tanstack/react-router';
import { pdfRoute } from '../../router.tsx';
import { PdfViewer } from '../../../pdf/pdf-viewer/pdf-viewer/pdf-viewer.tsx';

import styles from './main.module.css';

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
      <Page className={pdfVisible ? styles.pdfPage : ''}>
        <div
          style={{
            backgroundColor: 'var(--color-primary)',
            height: '20px',
            width: '100%',
          }}
        >
          Virtual Module Test (Should be Magenta)
        </div>
        {pdfVisible ? (
          <PdfViewer />
        ) : (
          <section id="dg-content">
            <div>
              <Outlet />
            </div>
          </section>
        )}
        <WebFooter parameters={parameters} />
      </Page>
    </>
  );
};
