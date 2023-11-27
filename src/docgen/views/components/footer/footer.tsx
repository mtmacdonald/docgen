import React from 'react';
import { Copyright } from "../copyright/copyright";

export const Footer = ({
  parameters
}) => {
  return (
    <>
      <p>
        <Copyright parameters={parameters} />
      </p>
      <p>
        <span id="dg-marking">{parameters.marking}</span>
        <span id="dg-legalese">{parameters.legalese}</span>
        <span id="dg-attribution">{parameters.attribution}</span>
      </p>
    </>
  );
};
