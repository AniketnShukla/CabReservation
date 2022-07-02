//import express, path, fs, bcrypt modules.
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

//add in server file
// const appendPasswords = require('./files/appendPasswords');
// app.get('/a', appendPasswords);


const appendPasswords = (req, res) => {
    fs.readFile(path.join(__dirname, 'passowrds.json'), 'utf-8', async(err, passwordData) => {
        if (err) throw err;
        readJsonArray = JSON.parse(passwordData);
        console.log(req.query);
        pass(readJsonArray, res);

    });
};
const pass = (passwordData, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', async(err, usersStr) => {
        if (err) throw err;
        let users = JSON.parse(usersStr);
        for (i = 0; i < 71; i++) {
            const hashedPassword = await bcrypt.hash(passwordData[i].password, 10);
            users[i].password = passwordData[i].password.toString();
            users[i].Hashedpassword = hashedPassword.toString();
            console.log(users);
        }
        fs.writeFile(path.join(__dirname, "files", 'users.json'), JSON.stringify(users), (err) => {
            // if(err) throw err;
            console.log('done');
            res.send('done');
        });
    })
}

module.exports = appendPasswords;