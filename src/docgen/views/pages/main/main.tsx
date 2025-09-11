import React from 'react';
import { WebFooter } from '../../components/footer/footer.tsx';
import { TopBar } from '../../components/top-bar/top-bar.tsx';
import { SideBar } from '../../components/side-bar/side-bar.tsx';
import { Page } from '../../components/page/page.tsx';
import type { Parameters } from '../../../types.ts';
import { Outlet, useRouterState } from '@tanstack/react-router';

type MainProps = {
  parameters: Parameters;
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
      <TopBar parameters={parameters} pdfVisible={pdfVisible} />
      <SideBar name={name} sortedPages={sortedPages} pdfEnabled={pdfEnabled} />
      <Page>
        <section id="dg-content">
          <div id="dg-innerContent">
            <Outlet />
          </div>
        </section>
        <WebFooter parameters={parameters} />
      </Page>
    </>
  );
};
