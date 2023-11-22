import React from 'react';

export const WebCover = ({}) => {
  return (
    <div className="w-fixed-width">
      <div id="dg-innerContent">
        <table
          className="w-table w-fixed"
          id="dg-coverInfo">
          <thead>
          <tr>
            <th colSpan={3} id="dg-title"></th>
          </tr>
          </thead>
          <tfoot>
          </tfoot>
          <tbody>
          <tr>
            <td><strong>Owner: </strong> <span id="dg-owner"></span></td>
            <td><strong>Version: </strong> <span id="dg-version"></span></td>
            <td><strong>Released: </strong> <span id="dg-release-date"></span></td>
          </tr>
          <tr>
            <td><strong>Author: </strong> <span id="dg-author"></span></td>
            <td colSpan={2}><strong>Contributors: </strong> <span id="dg-contributors"></span></td>
          </tr>
          <tr className="dg-finalRow">
            <td><strong>Module: </strong> <span id="dg-module"></span></td>
            <td><strong>ID: </strong> <span id="dg-id"></span></td>
            <td><strong>Link: </strong> <span id="dg-website"></span></td>
          </tr>
          </tbody>
        </table>
        <h1>Summary</h1>
        <p id="dg-summary"></p>
      </div>
    </div>
  )
};
