import React from 'react';
import MarkdownIt from 'markdown-it';
import Html from 'react-pdf-html';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
//import { Copyright } from "../../views/components/copyright/copyright";

const markdown = new MarkdownIt('commonmark').enable('table');

const styles = StyleSheet.create({
  page: {
    padding: '1cm',
    fontSize: 12,
    margin:0,
  },
  // footer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   textAlign: 'center',
  //   fontSize: 12,
  //   color: 'grey',
  // },
  // footer: {
  //   position: 'absolute',
  //   bottom: 0, // Adjust as needed
  //   left: 0,
  //   right: 0,
  //   textAlign: 'center',
  //   fontSize: 10,
  //   color: 'grey',
  // },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    display: 'flex'
  },
  footerLeft: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footerMiddle: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

const Footer = () => (
  <View style={styles.footer} fixed debug>
    <Text style={styles.footerLeft}>Baz</Text>
    <Text
      style={styles.footerMiddle}
      // render={({ pageNumber, totalPages }) => (
      //   `${pageNumber} / ${totalPages}`
      // )}
    >
      Foo
    </Text>
    <Text style={styles.footerRight}>Bar</Text>
  </View>

);

export const Pdf = ({
  parameters,
  options,
  pages,
  sortedPages
}) => {
  let allPages = [];
  for (let key in sortedPages) {
    if (sortedPages.hasOwnProperty(key)) {
      sortedPages[key].forEach((section) => {
        section.pages.forEach((page) => {
          let key = page.source;
          allPages.push(key);
        });
      });
    }
  }
  return (
    <Document>
      {Object.values(pages).map((p, i) => (
        <Page key={i} size="A4" style={styles.page}>
          <View>
            <
              // @ts-ignore
              Html
            >{p}</Html>
          </View>
          <Footer />
            {/*<Text>Footer text - Page 2</Text>*/}
        </Page>
      ))}
    </Document>
  );
}

// export const PdfFooter = ({
//                             parameters
//                           }) => {
//   return (
//     <div id="dg-pdf-footer">
//       <table>
//         <thead></thead>
//         <tfoot></tfoot>
//         <tbody>
//         <tr>
//           <td>
//             <span id="dg-title">{parameters.title}</span>&nbsp;
//             (<span id="dg-web-title-version">{parameters.version}</span>)
//           </td>
//           <td>
//             <Copyright parameters={parameters} />
//           </td>
//           <td>
//             Page <span className="page"></span> of <span className="topage"></span>
//           </td>
//         </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };