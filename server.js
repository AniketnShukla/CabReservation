const express = require('express');
const fs = require('fs');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const port = 3000;
const searchCabs = require('./domain/searchCabs');
const path = require('path');
const bcrypt = require('bcrypt');

const bookCab = require('./domain/bookCab');
const userLogin = require('./domain/userLogin');
const registerUsers = require('./domain/registerUsers');
const registerAdmin = require('./domain/registerAdmin');
const adminLogin = require('./domain/adminLogin');


app.set("view-engine", "ejs");
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
//removed static () for views
//what why extended: true|false
app.use(express.urlencoded({ extended: true }));
// Defining Cookie-parser usage so that the server can access the necessary option to save, read and access a cookie.
app.use(cookieParser());
require('dotenv').config();
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    httpOnly: false
}));


//get requests

app.get('/main', (req, res) => { // console.log(req);
    res.render(__dirname + "/views/main.ejs")
});

app.get('/login', (req, res) => {
    session = req.session;
    if (session.email) {
        console.log("Welcome User <a href=\'/logout'>click to logout</a>");
    } else {
        res.render(__dirname + "/views/login.ejs")
    }
})
app.post('/login', userLogin);


app.get('/registerUsers', (req, res) => {
    res.render(__dirname + "/views/registerUsers.ejs")
})
app.post('/registerUsers', registerUsers);


app.get('/adminlogin', (req, res) => {
    res.render(__dirname + "/views/adminlogin.ejs")
})
app.post('/adminlogin', adminLogin);


app.get('/clientMain', bookCab);
app.post('/clientMain', searchCabs);

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/registerAdmin", (req, res) => {
    // console.log(req.body);
    res.render(__dirname + "/views/registerAdmin.ejs");
});
app.post("/registerAdmin", registerAdmin);

app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
})