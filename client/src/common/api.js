import { mapFeedItem } from './mapping';

// TODO: configure production url
const BASE_URL = 'http://localhost:8080';

export const getFeed = async () => {
  // fetch data from server
  const response = await fetch(`${BASE_URL}/`);
  const data = await response.json();

  // map data
  const mappedData = data.map(item => mapFeedItem(item));

  return mappedData;
};
