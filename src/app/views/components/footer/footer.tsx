import React from 'react';
import { Copyright } from '../copyright/copyright.tsx';
import styles from './footer.module.css';

export const Footer = ({ parameters }) => {
  return (
    <>
      <p>
        <Copyright parameters={parameters} />
      </p>
      <p>
        <span>
          {parameters.marking} {parameters.legalese} {parameters.attribution}
        </span>
      </p>
    </>
  );
};

export const WebFooter = ({ parameters }) => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          <span>{parameters.webFooter}</span>
        </p>
      </div>
      <div>
        <Footer parameters={parameters} />
      </div>
    </footer>
  );
};
