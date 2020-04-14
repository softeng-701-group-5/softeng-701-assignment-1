/** https://bit.ly/2JZeqxV
 *
 * Turns a query string of the form 'x=...&b=...&c=...' into an object of
 * the form { x: ..., y: ..., z: ... }.
 */
export const parseUrlQuery = query => {
  return JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) => {
      return key === '' ? value : decodeURIComponent(value);
    }
  );
};
