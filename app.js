const dns = require('dns');
const port = 8089;

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
  res.write(JSON.stringify({ ip: ip }));
  res.end("");
});

/* GEOIP */
app.get('/geoip', function(req, res) {
    const ip = req.query.address;
    const geo = geoip.lookup(ip);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(geo));
    res.end("");
});

app.get('/mygeoip', function(req, res) {
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

app.listen(port, '0.0.0.0', function() {
  console.log('Express server (http) is listening on 0.0.0.0:' + port);
});
