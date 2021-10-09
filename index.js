const express = require('express');
const dnsPromises = require('dns').promises;
const smtp = require('smtp-protocol');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

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

app.get('/api/smtp/:email', async (req, res) => {
    let email = req.params.email;
    let hostname = email.split('@').pop();

    try {
        serverInfo = await dnsPromises.resolveMx(hostname);
        emailHost = serverInfo[0].exchange
    } catch (error) {
        res.status(404).send({
            "error": error.code
        });
        return;
    }

    try {
        smtp.connect(emailHost, 587, (mail) => {
            mail.helo(emailHost, (err, code, lines) => {
                if (err) {
                    res.status(404).send({"error": err})
                    return;
                } else {
                    res.send({
                        "status": code,
                        "lines": lines
                    });
                    return;
                }
            });
            mail.quit();
        });            
    } catch (error) {
        res.status(404).send({
            "error": error.code
        });
        return;
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});