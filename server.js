const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
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

app.get('/bookCab/:carNo', (req, res) => {
    console.log(req.params);

});


app.get('/main', (req, res) => {
    res.render(__dirname + "/views/main.ejs")
});

app.get('/registerUsers', (req, res) => {
    res.render(__dirname + "/views/registerUsers.ejs")
})

app.get('/adminlogin', (req, res) => {
    res.render(__dirname + "/views/adminlogin.ejs")
})

app.get("/registerAdmin", (req, res) => {
    res.render(__dirname + "/views/registerAdmin.ejs");
});

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