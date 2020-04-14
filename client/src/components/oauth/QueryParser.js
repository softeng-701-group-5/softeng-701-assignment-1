// https://bit.ly/2JZeqxV
export const parseUrlQuery = query => {
  return JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) => {
      return key === '' ? value : decodeURIComponent(value);
    }
  );
};
