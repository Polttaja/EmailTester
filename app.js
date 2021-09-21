const express = require('express');
const app = express();
const geoip = require('geoip-lite');
const dns = require('dns');

const port = process.env.PORT || 8080;

/* Headsite*/
app.get('', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* Normal IP-address*/
app.get('/api/ip/ip', (req, res) => {
  const ip = req.connection.remoteAddress;

  const ipjson = new Object();
  ipjson.ip = ip;

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ ip: ip }));
});

/* GEOIP */
app.get('/api/ip/geoip', (req, res) => {
  const ip = req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(geo));
});


/* Hostname to ip (?address=kaikkitietokoneista.net)*/
app.get('/api/ip/host2ip', (req, res) => {
  var address = req.query.address
  dns.lookup(address, (err, address, family) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ address: address, family: family }));
  });
});

app.get('*', (req, res) => {
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ error: "404"}));
});

app.listen(port, () => {
  console.log('Express server (http) is listening on *:' + port);
});
