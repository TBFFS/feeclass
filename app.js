var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
    Nedb = require('nedb'),
    db = new Nedb();

//Allow JSON posts/puts
app.use(bodyParser.json());

//Specify src as the plac where public files are found
app.use(express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));

//Add a route, so when you request GET /api/friends, this route
//will run.
//req = the request (incoming data from the client)
//res = the response (outgoing data to the client)
app.get('/api/friends', function (req, res) {
  db.find({}, function (err, friends) {
    res.json(friends);
  });
});

app.post('/api/friends', function (req, res) {
  var friend = {
    name: req.body.name,
    gender: req.body.gender
  };

  db.insert(friend, function (err, friendRecord) {
    if (err) {
      sonole.log(err);
      res.status(400).json(err);
    } else {
      res.json(friendRecord);
    }
  });
});

app.delete('/api/friends', function (req, res) {
  for (var i = 0; i < friends.length; ++i) {
    if (friends[i] === req) {
      friends.splice(i, 1);
    };
  };
  res.json(friends);
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address,
      port = server.address().port;

 console.log('Feeclass listening at http://%s:%s', host, port);
});
