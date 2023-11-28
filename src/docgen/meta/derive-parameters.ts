export const deriveParameters = ({
  parameters,
  setVersion,
  setReleaseDate,
  homeLink
}) => {
  const version = setVersion || parameters.version;
  const releaseDate = setReleaseDate || parameters.date;
  //the homepage is the first link in the first heading
  const homePagePath = `${homeLink.source.slice(0, homeLink.source.lastIndexOf('.'))}.html`;
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString('en-GB'); // 'DD/MM/YYYY'
  const time = currentDate.toLocaleTimeString('en-US', { hour12: false }); // 'HH:mm:ss'
  const year = currentDate.getFullYear().toString(); // 'YYYY'
  const attribution = `Created by DocGen ${version} on ${date} at ${time}.`;
  const webFooter = `Version ${version} released on ${releaseDate}`;
  return {
    ...parameters,
    attribution,
    year,
    webFooter,
    version,
    releaseDate,
    homePagePath
  }
};
