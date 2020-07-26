import { mapFeedItem } from './mapping';
import { client } from './client';

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

const sortAndMap = async endpoint => {
  const response = await client(endpoint);
  const sortedData = sortFeed(response);
  const mappedData = sortedData.map(item => mapFeedItem(item));
  return mappedData;
};

const feedApi = {
  getAllFeeds: async () => sortAndMap('/all'),
  getGithubFeed: async () => sortAndMap('/github'),
  getRedditFeed: async () => sortAndMap('/reddit'),
  getTwitterFeed: async () => sortAndMap('/twitter'),
  getHackerNewsFeed: async () => sortAndMap('/hackernews'),
  getWeatherFeed: async () => sortAndMap('/weather'),
  getCoronaFeed: async () => sortAndMap('/covid'),
};

const userApi = {
  getPreferences: async id => client(`/user/${id}`),
  updateUser: async (id, user) => {
    await client(`/user/${id}`, {
      method: 'PUT',
      body: user,
    });
  },
  getToken: async id => {
    await client(`/user/${id}/token`, {
      method: 'PUT',
    });
  },
};

export { feedApi, userApi };
