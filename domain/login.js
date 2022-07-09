//get request login

const login = (req, res) => {
    session = req.session;
    if (session.email) {
        console.log("Welcome User <a href=\'/logout'>click to logout</a>");
        res.redirect('loginLanding');
    } else {
        res.render(__dirname + "./../views/login.ejs")
    }
}

module.exports = login;