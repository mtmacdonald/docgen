// Todo: lift props to style dictionary

export const docsStyleSheet = {
  // Features cards
  ['.features']: {
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
    margin: '0 0 0.5cm',
  },
  ['.features li']: {
    listStyleType: 'none',
    verticalAlign: 'top',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '5cm',
    margin: '0.5cm 0.5cm 0 0',
  },
  ['.features li p']: {
    margin: 0,
    padding: '0 0 0.4cm 0',
    textAlign: 'left',
  },
  ['.features li img']: {
    alignSelf: 'flex-start',
    height: '1cm',
    objectFit: 'contain', // preserve aspect ratio
    marginBottom: '0.4cm',
  },
  // Feature details container
  ['.featureDetailsContainer']: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0.5cm',
    padding: '0.5cm 0',
  },
  ['.featureDetails']: {
    display: 'flex',
    flexDirection: 'column',
    width: '7cm',
  },
  // How it works cards
  ['.dgCardContainer']: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '0.5cm',
  },
  ['.dgCard']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    maxWidth: '5.5cm',
  },
  ['.dgCard img']: {
    width: '5.5cm',
    height: 'auto',
    borderRadius: '0.1cm',
  },
  ['.dgCard p']: {
    marginTop: '0.5cm',
    wordWrap: 'break-word',
  },
  // Sponsor cards
  ['.inkitSponsor']: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10 0',
  },
  ['.inkitText']: {
    flex: 1,
    justifyContent: 'left',
  },
  ['.inkitImage']: {
    flex: 1,
    alignItems: 'left',
  },
  ['.inkitImage img']: {
    width: 200,
    borderRadius: 8,
  },
};
