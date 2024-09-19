import React from 'react';
import {
  Text,
} from '@react-pdf/renderer';
import { PdfSvgIcon } from "./pdf-svg-icon/pdf-svg-icon";

export const customRenderers = {
  span: (payload) => {
    const {children, style, element} = payload;
    const classNames = element.classList.toString();
    if (classNames.includes('dgIcon')) {
      return PdfSvgIcon({children, classNames, style, element});
    }
    return <Text style={style}>{children}</Text>
  },
};
