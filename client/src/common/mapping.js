import moment from 'moment';

export const mapFeedItem = item => {
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
      return mapWeatherItem(item);
    case 'COVIDNINETEEN':
      return mapCovidNineteenItem(item);
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

const mapWeatherItem = item => ({
  media: 'weather',
  weather: item.weather[0].main,
  imageLink:
    'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png',
  mainText: item.weather[0].description,
  temperature: item.main.temp,
  minTemp: item.main.temp_min,
  maxTemp: item.main.temp_max,
  pressure: item.main.pressure,
  humidity: item.main.humidity,
  windSpeed: item.wind.speed,
  windDeg: item.wind.deg,
  sunrise: item.sys.sunrise,
  sunset: item.sys.sunset,
  relativeTime: new Date(Date.now()).toDateString(),
});

const mapCovidNineteenItem = item => ({
  media: 'covidNineteen',
  mainText: 'Covid-19',
  totalConfirmed: item.totalConfirmed,
  totalDeaths: item.totalDeaths,
  totalProbable: item.totalProbable,
  totalRecovered: item.totalRecovered,
  totalHospitalised: item.totalHospitalised,
  newConfirmed: item.newConfirmed,
  newDeaths: item.newDeaths,
  newProbable: item.newProbable,
  newRecovered: item.newRecovered,
  newHospitalised: item.newHospitalised,
});
