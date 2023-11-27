import React from 'react';

export const Footer = ({
  parameters
}) => {
  return (
    <>
      <p>
        <span id="dg-copyright">
          &copy; {parameters.year} &nbsp;
          {parameters?.organization?.url ? (
            <a href={parameters.organization.url}>{parameters.organization.name}</a>
          ) : parameters?.organization?.nmee ? (
            <span>parameters.organization.name</span>
          ) : null}
        </span>
      </p>
      <p>
        <span id="dg-marking">{parameters.marking}</span>
        <span id="dg-legalese">{parameters.legalese}</span>
        <span id="dg-attribution">{parameters.attribution}</span>
      </p>
    </>
  );
};
