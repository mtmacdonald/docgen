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
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
  },
  ['.features li']: {
    listStyleType: 'none',
    verticalAlign: 'top',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '5cm',
    marginRight: '0.5cm',
    marginTop: '0.5cm',
  },
  ['.features li img']: {
    alignSelf: 'flex-start',
    height: '1cm',
    objectFit: 'contain', // preserve aspect ratio
    marginBottom: '0.1cm',
  },
  ['.features h4']: {
    fontSize: 10, // TODO: not working (root style wins)
  },
};
