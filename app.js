var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    Datastore = require('nedb'),
    db = new Datastore({ filename: 'db/friends.db', autoload: true });

//Allow JSON posts/puts
app.use(bodyParser.json());

//Specify src as the place where public files are found
app.use(express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));

//Add a route, so when you request GET /api/friends, this route
//will run.
//req = the request (incoming data from the client)
//res = the response (outgoing data to the client)
app.get('/api/friends', function (req, res) {
  db.find({}, function (err, friends) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(friends);
    }
  });
});

app.post('/api/friends', function (req, res) {
  var friend = {
    name: req.body.name,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    hair: req.body.hair,
    birthCity: req.body.birthCity
  };

  db.insert(friend, function (err, friendRecord) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(friendRecord);
    }
  });
});

app.delete('/api/friends/:id', function (req, res) {
  db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(204).end();
    }
  });
});

app.put('/api/friends/:id', function (req, res) {
  db.update({ _id: req.params.id }, {}, function (err, friend) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(friend);
    }
  });
});

app.get('api/friends/:id', function (req, res) {
  db.findOne({ _id: req.params.id }, function (err, friend) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(friend);
    }
  });
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address,
      port = server.address().port;

 console.log('Feeclass listening at http://%s:%s', host, port);
});
