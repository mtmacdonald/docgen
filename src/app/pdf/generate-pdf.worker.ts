const slowTask = async () => {
  let data;
  try {
    const { generatePdf } = await import('./generate-pdf');
    data = await generatePdf();
  } catch (error) {
    console.error(error);
  }
  self.postMessage({
    type: 'complete',
    payload: {
      data,
    },
  });
};

self.onmessage = ({ data: message }) => {
  switch (message.type) {
    case 'start':
      slowTask();
      break;
    default:
  }
};
