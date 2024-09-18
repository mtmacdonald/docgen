import React from 'react';
import {
  Svg,
  Path
} from '@react-pdf/renderer';

/*
 Loosely inspired by
  - https://github.com/Airthium/react-pdf-svg
  - https://github.com/EvHaus/react-pdf-charts/blob/dev/src/index.tsx
*/

export const renderSvg = () => {
  return (
    <Svg style={{ width: 400, height: 400 }}>
      <Path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <Path stroke="black" d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <Path stroke="purple" d="M6 4v4" />
      <Path stroke="black" d="M6 12v8" />
      <Path stroke="black" d="M13.954 15.574a2 2 0 1 0 -1.954 2.426" />
      <Path stroke="black" d="M12 4v10" />
      <Path stroke="black" d="M12 18v2" />
      <Path stroke="black" d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <Path stroke="black" d="M18 4v1" />
      <Path stroke="black" d="M18 9v6" />
      <Path stroke="black" d="M16 19h6" />
    </Svg>
  )
};
