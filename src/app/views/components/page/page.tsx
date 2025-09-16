import React, { ReactNode } from 'react';

type PageProps = {
  children?: ReactNode;
};

export const Page = ({children} : PageProps) => {
  return (
    <div
      className="page"
    >
      {children}
    </div>
  );
};
