const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const dns = require('dns');
const port = 8080;

/* Headsite*/
app.get('', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("");
  res.end("");
});

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


/* Hostname to ip (?address=kaikkitietokoneista.net)*/
app.get('/host2ip', function(req, res) {
  var address = req.query.address
  dns.lookup(address, (err, address, family) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({ address: address, family: family }));
    res.end("");
  });
});

app.get('/*', function(req, res) {
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({ error: "404"}));
  res.end("");
});

app.listen(port, function() {
  console.log('Express server (http) is listening on *:' + port);
});
