import React, { ReactNode } from 'react';

type PageProps = {
  children?: ReactNode;
  className?: string;
};

export const Page = ({ children, className = '' }: PageProps) => {
  return <div className={`page ${className}`}>{children}</div>;
};
