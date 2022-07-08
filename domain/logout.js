const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

module.exports = logout;