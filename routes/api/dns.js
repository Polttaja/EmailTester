const dnsPromises = require('dns').promises;

module.exports = dnsCheck = async (req, res) => {
    let email = req.params.email;
    let hostname = email.split('@').pop();
    console.log(hostname);
    try {
        res.send(await dnsPromises.resolveMx(hostname));
    } catch (error) {
        console.error(error)
        res.status(404).send({
            "error": error.code
        });
    }
}