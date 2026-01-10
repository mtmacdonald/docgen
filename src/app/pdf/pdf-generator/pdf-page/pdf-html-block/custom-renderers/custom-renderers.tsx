import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import * as cheerio from 'cheerio';

declare const __BASE_PATH__: string;

/*
  For "default" renderers in react-pdf-html, see

  renderBlock: <View style={style}>{children}</View>
  renderInline: <Text style={style}>{children}</Text>

  (and renderers.tsx for more details)
*/

export const customRenderers = () => ({
  div: (payload) => {
    const { children, style, element } = payload;
    const classNames = element.classList.toString();
    if (classNames.includes('dgPDFPageBreak')) {
      return (
        <View break style={style}>
          {children}
        </View>
      );
    }
    return <View style={style}>{children}</View>;
  },
  pre: (payload) => {
    const { children, element, style } = payload;
    //strip and handle code blocks
    const $ = cheerio.load(element.content.join());
    const code = $('code');
    if (code.length) {
      return <Text style={style}>{code.text().trim()}</Text>;
    }
    return <Text style={style}>{children}</Text>;
  },
  img: (payload) => {
    const { element, style } = payload;
    // Load images from base URL
    return (
      <Image
        style={style}
        source={`${__BASE_PATH__}${element?.attributes?.src}`}
      />
    );
  },
});
