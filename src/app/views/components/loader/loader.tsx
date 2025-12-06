import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './loader.module.css';

export interface ILoaderProps {
  cover?: boolean;
  width?: string | number;
  height?: string | number;
  text?: string;
  details?: string | ReactNode;
  children?: ReactNode;
  testId?: string | null;
  theme?: string;
}

export const Loader = ({
  width,
  height,
  text = '',
  children = null,
  //theme = Theme.DARK,
  testId = null,
}: ILoaderProps) => {
  const color = 'black'; //theme === Theme.DARK ? Theme.WHITE : Theme.INHERIT;

  const background = '#ccc';
  return (
    <div
      className={cx(styles.loader, styles.cover)}
      style={{ width, height }}
      data-testid={testId}
    >
      <div className={styles.dimmer} style={{ background, color }}>
        <div
          className={styles.content}
          data-testid={testId && `${testId}-content`}
        >
          {children}
          {text && (
            <div
              className={styles.text}
              data-testid={testId && `${testId}-text`}
            >
              {text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
