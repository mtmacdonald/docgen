import React from 'react';
import { Link } from '@tanstack/react-router';
import { PdfToggleButton } from '../pdf-toggle-button/pdf-toggle-button.tsx';
import styles from './top-bar.module.css';

const Logo = ({ parameters }) => {
  return (
    parameters?.logoPath && (
      <img
        style={{ marginRight: '25px' }}
        src={parameters?.logoPath}
        alt="logo"
      />
    )
  );
};

export const TopBar = ({ parameters }) => {
  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.left}>
          <Link to="/">
            <Logo parameters={parameters} />
          </Link>
          <div className={styles.headerLeftText}>
            <Link to={parameters.homePagePath}>
              <span>{parameters.title}</span>
              <span style={{ fontWeight: 'normal' }}>
                &nbsp;({parameters.version})
              </span>
            </Link>
            {parameters?.sponsorLink?.name && (
              <div className={styles.headerSponsor}>
                <span>{parameters.sponsorLink.name}</span>
                <a href={parameters.sponsorLink.url}>
                  <img
                    className={styles.sponsorLogo}
                    src={parameters.sponsorLink.logo}
                    alt="sponsor logo"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
        <div
          className={styles.right}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <PdfToggleButton />
          <span className={styles.dgBackLink}>
            {parameters.backlink.url && (
              <a className="button inverted" href={parameters.backlink.url}>
                {parameters.backlink.name}
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
