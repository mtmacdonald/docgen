import React from 'react';
import {
  Text,
} from '@react-pdf/renderer';
import { renderSvg } from "./pdf-svg/pdf-svg";

export const customRenderers = {
  span: (payload) => {
    const {children, style, element} = payload;
    const classNames = element.classList.toString();
    if (classNames.includes('dgIcon')) {
      return renderSvg();
    }
    return <Text style={style}>{children}</Text>
  },
};
