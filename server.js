// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Timestamp Microservice Endpoints
// On empty datestring return new Date().
app.get("/api/timestamp", (req, res) => {
  const emptyDate = new Date(),
        timestampObject = {
          unix: emptyDate.getTime(), 
          utc: emptyDate.toUTCString()
        };
  res.json(timestampObject);
});

// On datestring try to parse it or return error.
app.get("/api/timestamp/:datestring", (req, res) => {
  let timestampObject = {
        unix: 0,
        utc: ''
      };
  if (!Date.parse(req.params.datestring)) {
    timestampObject = {unix: null, utc: 'Invalid Date'};
  }
  else {
    const date = new Date(req.params.datestring);
    timestampObject = {unix: date.getTime(), utc: date.toUTCString()};
  }
  console.log(req.params, Date.parse(req.params.datestring));
  res.json(timestampObject);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
