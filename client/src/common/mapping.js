import moment from 'moment';

export const mapFeedItem = item => {
  // TODO: add support for hackernews feed
  switch (item.feedType) {
    case 'REDDIT':
      return mapRedditItem(item);
    case 'GITHUB':
      return mapGitHubItem(item);
    case 'TWITTER':
      return mapTwitterItem(item);
    case 'HACKERNEWS':
      return mapHackerNewsItem(item);
    case 'WEATHER':
      console.log(item);
      return mapWeatherItem(item);
    case 'COVIDNINETEEN':
      return {};
    default:
      throw new Error(`feedType ${item.feedType} unsupported`);
  }
};

const mapRedditItem = item => ({
  media: 'reddit',
  title: item.title,
  username: item.author,
  mainText: item.selftext,
  relativeTime: moment(item.created).fromNow(),
  mediaSourceLink: item.url,
});

const mapGitHubItem = item => ({
  media: 'github',
  title: `${item.payload.subject} ${item.payload.action}`
    .replace('_', ' ')
    .replace('unknown', '')
    .toLowerCase(),
  username: item.actor.display_login,
  mainText: item.repo.name,
  avatarLink: item.actor.avatar_url,
  relativeTime: moment(item.created_at).fromNow(),
  mediaSourceLink: item.repo.url,
});

const mapTwitterItem = item => ({
  media: 'twitter',
  title: 'New Tweet',
  username: item.profileUsername,
  mainText: item.tweet,
  imageLink: item.imageLink,
  avatarLink: item.profileImageURI,
  relativeTime: moment(item.tweetPostDate).fromNow(),
});

const mapHackerNewsItem = item => ({
  media: 'hackernews',
  title: item.title,
  username: item.username,
  mainText: item.text,
  relativeTime: moment(item.time * 1000).fromNow(),
  mediaSourceLink: item.url,
});

const mapWeatherItem = item => ({});
