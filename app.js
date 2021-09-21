const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const dns = require('dns');

const port = process.env.PORT || 8080;

/* Headsite*/
app.get('', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

/* Normal IP-address*/
app.get('/ip', function(req, res) {
  const ip = req.connection.remoteAddress;

  const ipjson = new Object();
  ipjson.ip = ip;

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ ip: ip }));
});

/* GEOIP */
app.get('/geoip', function(req, res) {
  const ip = req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(geo));
});


/* Hostname to ip (?address=kaikkitietokoneista.net)*/
app.get('/host2ip', function(req, res) {
  var address = req.query.address
  dns.lookup(address, (err, address, family) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ address: address, family: family }));
  });
});

app.get('*', function(req, res) {
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ error: "404"}));
});

app.listen(port, function() {
  console.log('Express server (http) is listening on *:' + port);
});
