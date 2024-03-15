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
        <span>
          {parameters.marking} {parameters.legalese} {parameters.attribution}
        </span>
      </p>
    </>
  );
};


export const WebFooter = ({parameters}) => {
  return (
    <footer>
      <div>
        <p className="w-fixed-width">
          <span id="dg-web-footer">
            {parameters.webFooter}
          </span>
        </p>
      </div>
      <div className="w-fixed-width">
        <Footer parameters={parameters} />
      </div>
    </footer>
  )
};