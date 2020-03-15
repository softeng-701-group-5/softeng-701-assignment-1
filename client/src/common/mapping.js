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
  mainText: item.tweet, // TODO: extract image from tweet
  avatarLink: item.profileImageURI,
  relativeTime: moment(item.tweetPostDate).fromNow(),
});
