// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  let paramsString = req.params.date_string;
  let userDate;
  
  function separateParams() {
    return paramsString.split("-");
  }
  
  function getParamsLength() {
    return separateParams().length;
  }
  
  function sendObj(d) {
    let objToSend = {
      "unix": d.getTime(),
      "utc": d.toUTCString()
    };
  
    res.send(objToSend);
  }
  
  if (paramsString === undefined) {
    userDate = new Date();
    sendObj(userDate);
  }
  else if (getParamsLength() === 1) {
    userDate = new Date(parseInt(separateParams(), 10));
    sendObj(userDate);
  }
  else if (getParamsLength() === 3) {
    let dateVals = separateParams().map(d => parseInt(d, 10));
    userDate = new Date(dateVals[0], dateVals[1] - 1, dateVals[2]);
    sendObj(userDate);
  }
  else {
    userDate = new Date(paramsString);
    sendObj(userDate);
  }
});


// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});