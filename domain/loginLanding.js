const path = require('path');

const loginLanding = (req, res) => {
    session = req.session;
    if (typeof session.email !== undefined) {
        res.render(path.join(__dirname, '../', 'views', 'loginLanding.ejs'));
    } else {
        redirect('/login');
    }
}

module.exports = loginLanding;