import Cookies from 'js-cookie';

/**
 * Cookies are stored in the form 'feedr_<app>_token'.
 *
 * The cookies store the entire object returned from the authorization
 * process. This may be a single key/value or multiple depending on the app.
 *
 * Note that all cookies are stored in string form, even objects, so use
 * JSON.parse(cookie) to turn it back into an object to access its keys (e.g.
 * 'code' or 'oauth_token').
 */
const CookieManager = {
  setUserToken: (token, app) => {
    Cookies.set('feedr_' + app + '_token', token);
  },
  getUserToken: app => {
    return Cookies.get('feedr_' + app + '_token');
  },
  removeUserToken: app => {
    Cookies.remove('feedr_' + app + '_token');
  },
};

export default CookieManager;
