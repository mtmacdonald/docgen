import React from 'react';
import {
  Text,
} from '@react-pdf/renderer';
import cheerio from 'cheerio';
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
  pre: (payload) => {
    const {children, element, style} = payload;
    //strip and handle code blocks
    const $ = cheerio.load(element.content.join());
    const code = $('code');
    if (code.length) {
      return <Text style={style}>{code.text().trim()}</Text>;
    }
    return <Text style={style}>{children}</Text>;
  },
};
