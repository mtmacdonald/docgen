import React from 'react';
import { Copyright } from "../copyright/copyright.tsx";

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
        <p>
          <span id="dg-web-footer">
            {parameters.webFooter}
          </span>
        </p>
      </div>
      <div>
        <Footer parameters={parameters} />
      </div>
    </footer>
  )
};