const path = require('path');

const loginLanding = (req, res) => {
    res.render(path.join(__dirname, '../', 'views', 'loginLanding.ejs'));
}

module.exports = loginLanding;