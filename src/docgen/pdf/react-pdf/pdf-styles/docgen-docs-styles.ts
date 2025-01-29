// Todo: lift props to style dictionary

export const docsStyleSheet = {
  ['.dgCardContainer']: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    gap: '0.5cm',
  },
  ['.dgCard']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
  },
  ['.dgCard img']: {
    width: '5cm',
    height: 'auto',
  },
  ['.dgCard p']: {
    marginTop: '0.5cm',
  },
  // Features cards
  ['.features']: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensure items wrap properly
    width: '100%',
    justifyContent: 'flex-start',
    gap: 10, // Space between items
  },
  ['.features li']: {
    listStyleType: 'none',
    verticalAlign: 'top',
    display: 'flex', // Change to flex for proper alignment
    flexDirection: 'column', // Ensure text appears below image
    alignItems: 'center', // Center content inside each card
    width: '4.5cm', // Adjusted to prevent stacking issues
    marginRight: '0.5cm',
    marginTop: '0.5cm',
  },
  ['.features li img']: {
    width: '1cm', // Ensure consistent image size
    height: '1cm',
    marginBottom: '0.2cm',
  },

  // ['.features']: {
  //   margin: '0',
  //   padding: '0',
  //   width: '100%',
  // },
  // ['.features li']: {
  //   verticalAlign: 'top',
  //   display: 'inline-block',
  //   width: '2cm',
  //   marginRight: '0.5cm',
  //   marginTop: '0.5cm',
  // },
  // ['.features li img']: {
  //   height: '0.5cm',
  //   marginBottom: '0.2cm',
  // },
  // ['.features li span']: {
  //   verticalAlign: 'middle',
  //   marginRight: '0.2cm',
  // },
  // ['.features h4']: {
  //   marginBottom: '0',
  // },
};
