const express = require('express');
const dnsPromises = require('dns').promises;
const smtp = require('smtp-protocol');

const { frontPage, dnsCheck, smtpCheck } = require ('./routes')

const app = express();
const port = process.env.PORT || 3000;

app.get('/', frontPage);

app.get('/api/dns/:email', dnsCheck);

app.get('/api/smtp/:email', smtpCheck);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});