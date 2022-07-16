const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const fs = require('fs');
const port = 3000;
const searchCabs = require('./domain/searchCabs');
const path = require('path');

const bookCab = require('./domain/bookCab');
const userLogin = require('./domain/userLogin');
const registerUsers = require('./domain/registerUsers');
const registerAdmin = require('./domain/registerAdmin');
const adminLogin = require('./domain/adminLogin');
const login = require('./domain/login');
const logout = require('./domain/logout');
const preLoginLanding = require('./domain/preLoginLanding');
const loginLanding = require('./domain/loginLanding');
const bookedPage = require('./domain/bookedPage.js');
const compress = require('./domain/compress.js');
// const displayData = require('./domain/displayData.js');
//devTools
const sessionCheck = require('./domain/devTools/sessionCheck');

app.set("view-engine", "ejs");
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
//removed static () for views
//what why extended: true|false
app.use(express.urlencoded({ extended: true }));
// Defining Cookie-parser usage so that the server can access the necessary option to save, read and access a cookie.
app.use(cookieParser());
require('dotenv').config();
const oneDay = 1000 * 60 * 60 * 24 * 60;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
}));

//get requests
app.get('/', preLoginLanding)
app.get('/loginLanding', loginLanding)
app.get('/logout', logout);
app.get('/login', login)
app.get('/bookCab', bookCab);
app.get('/bookedPage', bookedPage);

//does it have a purpose anymore
//check teh control flow of book a cab 
app.get('/bookCab/:type', bookCab);
// app.get('/bookCab/booked/', something);


app.get('/main', (req, res) => {
    res.render(__dirname + "/views/main.ejs")
});

app.get('/displayusers', function(req, res) {
    fs.readFile(path.join(__dirname, './files/users.json'), 'utf-8', (err, readData) => {
        if (err) throw err;
        readJson = JSON.parse(readData);
        res.render(path.join(__dirname, './views/displayusers.ejs'), { 'data': readJson })
    });
})

app.get('/displaycabs', function(req, res) {
    fs.readFile(path.join(__dirname, './files/cabs.json'), 'utf-8', (err, readData) => {
        if (err) throw err;
        readJson = JSON.parse(readData);
        res.render(path.join(__dirname, './views/displaycabs.ejs'), { 'data': readJson })
    });
})

app.get('/displaybooked', function(req, res) {
    fs.readFile(path.join(__dirname, './files/bookedUsers.json'), 'utf-8', (err, readData) => {
        if (err) throw err;
        readJson = JSON.parse(readData);
        res.render(path.join(__dirname, './views/displaybooked.ejs'), { 'data': readJson })
    });
})

app.get('/registerUsers', (req, res) => {
    res.render(__dirname + "/views/registerUsers.ejs")
})

app.get('/adminlogin', (req, res) => {
    res.render(__dirname + "/views/adminlogin.ejs")
})
app.get('/adminLoginLanding', (req, res) => {
    res.render(__dirname + "/views/adminLoginLanding.ejs")
})
app.get('/compressdata', (req, res) => {
    res.render(__dirname + "/views/compressdata.ejs")
})
app.get("/registerAdmin", (req, res) => {
    res.render(__dirname + "/views/registerAdmin.ejs");
});
app.get("/admin/compress/:fileName", compress);
// app.get("/admin/display/:displayData", displayData);

//post requests
app.post('/login', userLogin);
app.post('/registerUsers', registerUsers);
app.post('/adminlogin', adminLogin);
app.post('/bookCab', searchCabs);
app.post("/registerAdmin", registerAdmin);

//turn searchcabs into searchcabs .searchcabs or delete the second export in bookCabs 

//dev tools
app.get('/session', sessionCheck)


app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
})