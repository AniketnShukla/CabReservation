//Post request for login

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const userLogin = (req, res) => {

    fs.readFile(path.join(__dirname, '../', 'files', 'users.json'), 'utf-8', async(err, readData) => {
        readJsonArray = JSON.parse(readData);
        const user = readJsonArray.find(user => user.email === req.body.email)
        if (user == null) {
            return res.status(400).send('Cannot find user');
        }
        try {
            if (await bcrypt.compare(req.body.password, user.Hashedpassword)) {
                session = req.session;
                session.email = req.body.email;
                res.redirect('/loginLanding');

            } else {
                //Make a toast notify to show wrong password
                res.send('Not Allowed');
            }
        } catch (error) {
            if (error) throw error;

        }
    })
}

module.exports = userLogin;