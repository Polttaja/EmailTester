const dnsPromises = require('dns').promises;
const smtp = require('smtp-protocol');

module.exports = smtpCheck =  async (req, res) => {
    let email = req.params.email;
    let hostname = email.split('@').pop();

    try {
        serverInfo = await dnsPromises.resolveMx(hostname);
        emailHost = serverInfo[0].exchange
    } catch (error) {
        console.error(error)
        res.status(404).send({
            "error": error.code
        });
        return;
    }

    try {
        smtp.connect(emailHost, 587, (mail) => {
            mail.helo(emailHost, (err, code, lines) => {
                if (err) {
                    console.error(err)
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
        console.error(error)
        res.status(404).send({
            "error": error.code
        });
        return;
    }
}