const path = require('path');

const preLoginLanding = (req, res) => {
    res.render(path.join(__dirname, '../', 'views', 'preLoginLanding.ejs'));
}

module.exports = preLoginLanding;