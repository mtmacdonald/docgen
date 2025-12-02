import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './card.module.css';

export interface ICardProps {
  bordered?: boolean;
  heading?: ReactNode;
  headerClassName?: string;
  margin?: string;
  padding?: boolean;
  raised?: boolean;
  children?: ReactNode;
}

export const Card = ({
  bordered = true,
  heading = null,
  headerClassName = '',
  children,
  margin = '0',
  padding = true,
  raised = false,
}: ICardProps) => {
  return (
    <div
      className={cx(
        styles.card,
        bordered ? styles.bordered : '',
        raised ? styles.raised : '',
      )}
      style={{ margin }}
    >
      {heading ? (
        <div className={cx(styles.cardHeader, headerClassName)}>{heading}</div>
      ) : null}
      <div
        className={cx(
          styles.cardContent,
          heading ? styles.cardContentBorderTop : '',
          padding ? styles.padding : '',
        )}
      >
        {children}
      </div>
    </div>
  );
};
