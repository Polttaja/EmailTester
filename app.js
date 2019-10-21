const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const port = 8080;

/* Normal IP-address*/
app.get('/ip', function(req, res) {
  const ip = req.connection.remoteAddress;

  const ipjson = new Object();
  ipjson.ip = ip;

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({ ip: ip }));
  res.end("");
});

/* GEOIP */
app.get('/geoip', function(req, res) {
  const ip = req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(geo));
  res.end("");
});

app.get('/*', function(req, res) {
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({ error: "404"}));
  res.end("");
});

app.listen(port, function() {
  console.log('Express server (http) is listening on *:' + port);
});
