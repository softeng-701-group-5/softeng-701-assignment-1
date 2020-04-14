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

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
