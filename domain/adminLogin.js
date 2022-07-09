const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');



const adminLogin = (req, res) => {
    fs.readFile(path.join(__dirname, '../', 'files', 'adminCredentials.json'), 'utf-8', async(err, readData) => {
        readJsonArray = JSON.parse(readData);
        console.log(readJsonArray);
        const user = readJsonArray.find(user => user.email === req.body.email)
        console.log(user);
        if (user == null) {
            return res.status(400).send('Cannot find user');
        }
        try {
            if (await bcrypt.compare(req.body.password, user.Hashedpassword)) {
                res.redirect('/adminLoginLanding');

            } else {
                res.send('Not Allowed, Wrong Password');
            }
        } catch (error) {
            if (error) throw error;

        }
    })
}


module.exports = adminLogin;