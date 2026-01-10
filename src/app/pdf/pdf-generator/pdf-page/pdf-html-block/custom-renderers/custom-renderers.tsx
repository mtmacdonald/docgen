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
    const { element, style } = payload;
    const html = element.innerHTML ?? '';
    const $ = cheerio.load(html);
    const code = $('code');
    const text = code.length ? code.text() : $.text();

    // Preserve indentation and multiple spaces with Non-Breaking Spaces
    // to ensure react-pdf doesn't collapse them
    const formattedText = text
      // Trim spaces at the start
      .replace(/^ +/gm, (match) => '\u00A0'.repeat(match.length))
      // preserve internal indentation
      .replace(/ {2,}/g, (match) => '\u00A0'.repeat(match.length))
      // consistent tab width
      .replace(/\t/g, '\u00A0\u00A0')
      .trimEnd();

    return <Text style={style}>{formattedText}</Text>;
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
