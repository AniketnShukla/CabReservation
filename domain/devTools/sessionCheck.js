const sessionCheck = (req, res) => {
    session = req.session;
    res.send(session);
}

module.exports = sessionCheck;