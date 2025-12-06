import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './card.module.css';

export interface ICardProps {
  bordered?: boolean;
  heading?: ReactNode;
  headerClassName?: string;
  className?: string;
  contentClassName?: string;
  margin?: string;
  padding?: boolean;
  raised?: boolean;
  dark?: boolean;
  children?: ReactNode;
}

export const Card = ({
  bordered = true,
  heading = null,
  headerClassName = '',
  className = '',
  contentClassName = '',
  children,
  margin = '0',
  padding = true,
  raised = false,
  dark = false,
}: ICardProps) => {
  return (
    <div
      className={cx(
        styles.card,
        bordered ? styles.bordered : '',
        raised ? styles.raised : '',
        dark ? styles.dark : '',
        className,
      )}
      style={{ margin }}
    >
      {heading ? (
        <div className={cx(styles.cardHeader, dark ? styles.dark : '')}>
          {heading}
        </div>
      ) : null}
      <div
        className={cx(
          styles.cardContent,
          heading ? styles.cardContentBorderTop : '',
          padding ? styles.padding : '',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};
