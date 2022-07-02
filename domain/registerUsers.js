const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const registerUsers = async(req, res) => {
    try {
        // const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(salt);
        // console.log(hashedPassword)
        const user = { name: req.body.name, email: req.body.email, phoneNo: req.body.phoneNo, password: req.body.password, Hashedpassword: hashedPassword }
        fs.readFile(path.join(__dirname, '../', 'files', 'users.json'), 'utf-8', async(err, readData) => {
            readJsonArray = JSON.parse(readData);
            readJsonArray.push(user);
            console.log(readJsonArray);
            fs.writeFile(path.join(__dirname, '../', "files", 'users.json'), JSON.stringify(readJsonArray), (err) => {
                    if (err) throw err;
                })
                // console.log(users)
                // readJ.push(user);
                // console.log(users)
                // res.status(201).send();
            res.redirect('/registerUsers');
        })
    } catch (err) {
        // res.status(500).send();
        if (err) throw err;
    }
}

module.exports = registerUsers;