const path = require('path');

module.exports = frontPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
}