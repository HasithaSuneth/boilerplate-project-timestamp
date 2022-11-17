// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:unixTime",(req, res) => {
  let user_input = req.params.unixTime;
  let parsed_date = Date.parse(user_input)
  if (isNaN(parsed_date) == false) {
    res.json({unix: parsed_date, utc: new Date(parsed_date).toUTCString()});
  }else{
    if (String(new Date(+user_input)) !== 'Invalid Date'){
      res.json({unix: +user_input, utc: new Date(+user_input).toUTCString()});
    }else {
      res.json({error: "Invalid Date"});
    }    
  }
})

app.get("/api/",(req, res) => {
  res.json({unix: Date.now(), utc: new Date(Date.now()).toUTCString()});
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});

