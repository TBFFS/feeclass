var express = require('express'),
    app = express();

//Add a route, so when you request GET /api/friends, this route
//will run.
//req = the request (incoming data from the client)
//res = the response (outgoing data to the client)
app.get('/api/friends', function (req, res) {
  res.send('Hello, world');
});

// Start the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address,
      port = server.address().port;

 console.log('Feeclass listening at http://%s:%s', host, port);
});
