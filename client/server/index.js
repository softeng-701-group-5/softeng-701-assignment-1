// var express = require('express'),
//   request = require('request'),
//   bodyParser = require('body-parser'),
//   app = express();

// var myLimit = typeof process.argv[2] != 'undefined' ? process.argv[2] : '100kb';
// console.log('Using limit: ', myLimit);

// app.use(bodyParser.json({ limit: myLimit }));

// app.all('*', function(req, res, next) {
//   // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     req.header('access-control-request-headers')
//   );

//   if (req.method === 'OPTIONS') {
//     // CORS Preflight
//     res.send();
//   } else {
//     var targetURL = req.header('Target-URL'); // Target-URL ie. https://example.com or http://example.com
//     if (!targetURL) {
//       res.send(500, {
//         error: 'There is no Target-Endpoint header in the request',
//       });
//       return;
//     }
//     request(
//       {
//         url: targetURL + req.url,
//         method: req.method,
//         json: req.body,
//         headers: { Authorization: req.header('Authorization') },
//       },
//       function(error, response, body) {
//         if (error) {
//           console.error('error: ' + response.statusCode);
//         }
//         //                console.log(body);
//       }
//     ).pipe(res);
//   }
// });

// app.set('port', 3001);

// app.listen(app.get('port'), function() {
//   console.log('Proxy server listening on port ' + app.get('port'));
// });

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('querystring');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', (req, res) => {
  console.log('TEST123');
  const name = req.query.name || 'World';

  const opt = {
    url: `https://www.reddit.com/api/v1/authorize?client_id=E6V2MtwA-JLx1w&response_type=code&
    state=abc123&redirect_uri=http://localhost:3001/test/oauth/callback&duration=permanent&scope=read`,
    method: 'GET',
  };

  axios(opt).then(resp => {
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({ greeting: `Hello ${name}!`, data: resp }));
    console.log('In axios callllll');
    console.log('321');
    console.log('456');
    console.log(resp.request.res);
    // console.log(resp);
  });
});

app.get('/proxy/reddit/token', (req, res) => {
  const code = req.query.code;
  console.log('THIS IS THE FINAL PLACE!');
  console.log(req.query);

  const opt = {
    url: 'https://www.reddit.com/api/v1/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          unescape(
            encodeURIComponent(
              'E6V2MtwA-JLx1w' + ':' + 'kOs6UxeT_DbjmxHQ5M1Fwb0bwJs'
            )
          )
        ).toString('base64'),
    },
    data: {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'http://localhost:3001/oauth/callback/reddit',
    },
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          unescape(
            encodeURIComponent(
              'E6V2MtwA-JLx1w' + ':' + 'kOs6UxeT_DbjmxHQ5M1Fwb0bwJs'
            )
          )
        ).toString('base64'),
    },
  };

  // axios(opt).then(resp => {
  //   console.log(resp.data);
  // });

  axios.post(opt.url, qs.stringify(opt.data), config).then(resp => {
    console.log('RESPONSE OF FINAL CALL TO GET ACCESS TOKEN!');
    console.log(resp.data);
  });
});

app.get('/oauth/callback/reddit', (req, res) => {
  console.log('In /test/oauth/callback call');
  console.log('REQ: ', req.query);
  // window.location = 'http://localhost:3000/connect';
  res.redirect(
    'http://localhost:3000/oauth/callback/reddit?state=' +
      req.query.state +
      '&code=' +
      req.query.code
  );
});

app.post('/oauth/callback/reddit', (req, rest) => {
  console.log('POST CALLBACK');
  console.log(req.body);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
