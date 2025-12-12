import React, { Fragment } from 'react';
import styles from './cover.module.css';

export const Cover = ({ parameters }) => {
  return (
    <div id="dg-innerContent">
      <table className={styles.dgCoverInfo}>
        <thead>
          <tr>
            <th colSpan={3}>{parameters.title}</th>
          </tr>
        </thead>
        <tfoot></tfoot>
        <tbody>
          <tr>
            <td>
              <strong>Owner: </strong>
              <span>
                {parameters.owner?.url ? (
                  <a href={parameters.owner.url}>{parameters.owner.name}</a>
                ) : (
                  parameters.owner.name
                )}
              </span>
            </td>
            <td>
              <strong>Version: </strong>
              <span>{parameters.version}</span>
            </td>
            <td>
              <strong>Released: </strong>
              <span>{parameters.releaseDate}</span>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Author: </strong>
              <span>
                {parameters.author?.url ? (
                  <a href={parameters.author.url}>{parameters.author.name}</a>
                ) : (
                  parameters.author.name
                )}
              </span>
            </td>
            <td colSpan={2}>
              <strong>Contributors: </strong>
              <span>
                {parameters.contributors.map((contributor, i) => (
                  <Fragment key={i}>
                    {contributor?.url ? (
                      <a href={contributor.url}>{contributor.name}</a>
                    ) : (
                      contributor.name
                    )}
                    {i < parameters.contributors.length - 1 && ','}
                  </Fragment>
                ))}
              </span>
            </td>
          </tr>
          <tr className={styles.dgFinalRow}>
            <td>
              <strong>Module: </strong>
              <span>{parameters.module}</span>
            </td>
            <td>
              <strong>ID: </strong>
              <span>{parameters.id}</span>
            </td>
            <td>
              <strong>Link: </strong>
              <span>
                {parameters.website?.url ? (
                  <a href={parameters.website.url}>{parameters.website.name}</a>
                ) : (
                  parameters.website.name
                )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <h1>Summary</h1>
      <p className={styles.dgSummary}>{parameters.summary}</p>
    </div>
  );
};
