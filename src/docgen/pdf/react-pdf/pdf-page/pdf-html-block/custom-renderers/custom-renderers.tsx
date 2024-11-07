import React from 'react';
import path from 'path';
import {
  Text,
  Image,
  View,
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
  div: (payload) => {
    const {children, style, element} = payload;
    const classNames = element.classList.toString();
    if (classNames.includes('dg-katexMath')) {
      /*
        React-pdf project has no plans for maths / Latex support:
          https://github.com/diegomura/react-pdf/issues/1356

        We could support equations if we can find a way to render them as images
        (neither Katex nor MathJax seem to make that easy built-in, they are
        engines for Latex to HTML). There are packages like katextual which
        can do this, but they are slow and require puppeteer to "print" the
        images:

          const katextual = await KaTeXtual.getInstance();
          const pngBuffer = await katextual.renderPng('\\int_0^{2\\pi}{\\sin{\\theta}}');
          const base64Png = pngBuffer.toString('base64');
          const dataUrl = `data:image/png;base64,${base64Png}`;

        Also more general ones like node-html-to-image.

        Rendering HTML to canvas might be possible? https://html2canvas.hertzen.com
         (emulation, not suitable for use in Node though)

        If we do "frontend PDF" (read elements from the webpage),
        NPM html-to-image might help.

        If we do solve it, react-pdf <Image> takes base-64 encoded source.
        For a very simple example, you can try node-html-to-image package:

        const dataUri = await generate('Lorem ipsum dolor sit amet');

        Note that customRenderers cannot be async, so all these conversions
        have to happen before the rendering pipeline.

        return <Image style={style} source={dataUrl} />;
      */
      return <Text>Maths Rendering not supported in DocGen PDF yet.</Text>;
    }
    return <View style={style}>{children}</View>;
  }
});
