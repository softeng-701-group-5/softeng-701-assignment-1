const axios = require('axios');

const router = express.Router();

const opt = {
  clientID: '27accc44aaf6da7e9936',
  clientSecret: 'c881c95ceb9030c7df8d841892ccf9d70dd5217c',
};

/** GitHub */
router.get('/callback/github', (req, res) => {
  console.log('~~~~~~~~~ CALLBACK CALLED!!!! ~~~~~~~~~~~~~~');

  const requestToken = req.query.code;

  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${opt.clientID}&client_secret=${opt.clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json',
    },
  }).then(resp => {
    const accessToken = resp.data.access_token;
    const ALL_DATA = resp.data;

    console.log(ALL_DATA);
  });
});

module.exports = router;
