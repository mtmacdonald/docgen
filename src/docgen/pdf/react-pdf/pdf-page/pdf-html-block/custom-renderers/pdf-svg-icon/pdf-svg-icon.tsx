import React from 'react';
import * as icons from '@tabler/icons-react';
import { SvgConverter } from '../svg-converter';
import {
  View,
} from '@react-pdf/renderer';

const iconNameToComponentName = (iconString: string): string => {
  const parts = iconString.split('-');
  const capitalizedParts = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
  return `Icon${capitalizedParts.join('')}`;
}

/*
 Loosely inspired by
  - https://github.com/DrugovLab/react-pdf-svg
  - https://github.com/Airthium/react-pdf-svg
  - https://github.com/EvHaus/react-pdf-charts
*/

export const PdfSvgIcon = ({children, classNames, style, element}) => {
  const iconName = element.getAttribute("data-name");
  let IconComponent;
  try {
    IconComponent = icons[iconNameToComponentName(iconName)];
  } catch (e) {
    // do nothing
  }
  if (!IconComponent) {
    return null;
  }
  return (
    <View>
      <SvgConverter
        baseFontSize={9}
        styleUpdateQuery={{
          svg: {
            color: 'white'
          },
        }}
      >
        <IconComponent color="white" size="48" />
      </SvgConverter>
    </View>
  )
};
