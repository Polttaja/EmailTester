const express = require('express');
const dnsPromises = require('dns').promises;

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/dns/:email', async (req, res) => {
    let email = req.params.email;
    let hostname = email.split('@').pop();
    console.log(hostname);
    try {
        res.send(await dnsPromises.resolveMx(hostname));
    } catch (error) {
        res.status(404).send({
            "error": error.code
        });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});