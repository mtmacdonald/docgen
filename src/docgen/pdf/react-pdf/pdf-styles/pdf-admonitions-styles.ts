export const pdfAdmonitionsStyles = {
  ['.admonition']: {
    padding: '10pt',
    marginLeft: 0,
    marginRight: 0,
    marginVertical: '12pt',
  },
  ['.admonition-title']: {
    fontWeight: 'bold',
    marginBottom: '6pt',
  },
  ['.admonition.info']: {
    color: '#1a202c', // TODO: not working
    backgroundColor: '#e6f0fa',
    borderLeft: '5px solid #3182ce',
  },
  ['.admonition.success']: {
    color: '#22543d',
    backgroundColor: '#f0fff4',
    borderLeft: '5px solid #38a169',
  },
  ['.admonition.warning']: {
    color: '#652b19',
    backgroundColor: '#fffaf0',
    borderLeft: '5px solid #dd6b20',
  },
  ['.admonition.error']: {
    color: '#742a2a',
    backgroundColor: '#fff5f5',
    borderLeft: '5px solid #e53e3e',
  },
  // Optional: blockquote in matching style
  // blockquote: {
  //   marginVertical: '12pt',
  //   padding: '10pt',
  //   borderLeft: '5px solid #a0aec0',
  //   backgroundColor: '#f7fafc',
  //   color: '#2d3748',
  //   fontStyle: 'italic',
  // },
};
