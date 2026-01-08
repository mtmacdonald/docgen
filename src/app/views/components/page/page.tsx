import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './page.module.css';

type PageProps = {
  children?: ReactNode;
  className?: string;
};

export const Page = ({ children, className = '' }: PageProps) => {
  return <div className={cx(styles.page, className)}>{children}</div>;
};
