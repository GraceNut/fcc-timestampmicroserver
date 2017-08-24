// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(function(req, res, next) {
  //res.send( req.originalUrl );
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var i = {
    'url': req.originalUrl.slice(1),
    'date': null
  }
  var r = {
    'unix': null,
    'natural': null,
  }
  if (!isNaN(Number(req.originalUrl.slice(1))) && i.url != "") {
    i.date = new Date(Number(i.url * 1000));
    r.unix = i.url;
    r.natural = months[i.date.getMonth()] + ' ' + i.date.getDate() + ', ' + i.date.getFullYear();
  } else if (new Date(i.url.split('%20').join(' ')) !== 'Invalid Date' && i.url != "") {
    i.date = new Date(i.url.split('%20').join(' '));
    r.unix = i.date.getTime() / 1000;
    r.natural = months[i.date.getMonth()] + ' ' + i.date.getDate() + ', ' + i.date.getFullYear();
  }
  res.send(r);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
