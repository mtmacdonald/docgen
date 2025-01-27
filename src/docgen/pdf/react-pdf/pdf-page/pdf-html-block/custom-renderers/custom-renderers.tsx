import React from 'react';
import path from 'path';
import {
  Text,
  Image,
} from '@react-pdf/renderer';
import cheerio from 'cheerio';
import { PdfSvgIcon } from "./pdf-svg-icon/pdf-svg-icon";

/*
  For "default" renderers in react-pdf-html, see

  renderBlock: <View style={style}>{children}</View>
  renderInline: <Text style={style}>{children}</Text>

  (and renderers.tsx for more details)
*/

export const customRenderers = ({options}) => ({
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
  img: (payload) => {
    const {element, style} = payload;
    const relativeSource = element.attributes.src;
    const source = path.join(options.input, relativeSource);
    return <Image style={style} source={source} />;
  },
});
