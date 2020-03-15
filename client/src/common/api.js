import { mapFeedItem } from './mapping';

// TODO: configure production url
const BASE_URL = 'http://localhost:8080';

export const getFeed = async () => {
  // fetch data from server
  const response = await fetch(`${BASE_URL}/`);
  const data = await response.json();

  // sort data
  const sortedData = sortFeed(data);

  // map data
  const mappedData = sortedData.map(item => mapFeedItem(item));

  return mappedData;
};

// sorts feed from newest to oldest
const sortFeed = feed => {
  return feed.sort((a, b) => {
    // parse date, while not assuming feed type
    const aDate = new Date(
      a.created || a.created_at || a.tweetPostDate || a.time * 1000
    );
    const bDate = new Date(
      b.created || b.created_at || b.tweetPostDate || a.time * 1000
    );

    return bDate - aDate;
  });
};
