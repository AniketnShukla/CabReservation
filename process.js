if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require('express');
const app = express();
const fs = require('fs');
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');
//what is { } <= how does it work
const { createGzip } = require("zlib");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const gunzip = require('gunzip-file');

const sep = '|';
const end = '\n';
const users = [];
let creds = [];

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
//for login
const initializePassport = require("./passport-config");

initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
);

//runs when register sends post request
const savingCredentials = (data) => {
    // console.log(data);
    // creds.push(data);
    // parsedJson = JSON.parse(data);
    // console.log(creds + 'Inside saving credentials line 38');
    fs.readFile(path.join(__dirname, 'files', 'users.json'), (err, oldData) => {
        var json = JSON.parse(oldData);
        // console.log('json:: ');
        // console.log(json);
        // dataToString = JSON.stringify());
        stringtoJsonObj = JSON.parse(json);
        json.push(stringtoJsonObj);
        if (data.email != '') {
            fs.writeFile(path.join(__dirname, 'files', 'users.json'), JSON.stringify(json), (err) => {
                if (err) throw err;
                // console.log(creds);
                console.log("Done Writing");
            })
        }
    })
}

app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
app.set("view-engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.post(
    "/login",
    // (req, res) => {
    //     console.log(req.body);
    // },
    passport.authenticate("local", {
        successRedirect: "/main",
        failureRedirect: "/login",
        failureFlash: true
    })
);

app.post("/register", async(req, res) => {
    try {
        // console.log('post request being made');
        // data = req.body;
        // console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        // console.log(users + 'inside post reguster body');
        savingCredentials(users);
        res.redirect("/login");
    } catch (e) {
        console.error(e);
        res.redirect("/register");
    }
    // console.log(users);
    // creds = [...users];
});
// console.log(creds);



//get requests
app.get('/main', checkAuthenticated, (req, res) => {
    // console.log(req);
    res.render(__dirname + "/views/main.ejs")
});
app.get('/login', (req, res) => {
    res.render(__dirname + "/views/login.ejs")
})
app.get("/register", (req, res) => {
    // console.log(req.body);
    res.render(__dirname + "/views/register.ejs");
});
app.get('/user', (req, res) => {
    res.render(__dirname + "/views/user.ejs")
})
app.get('/search', (req, res) => {
    res.render(__dirname + "/views/search.ejs")
})
app.get('/compress', (req, res) => {
    res.render(__dirname + '/views/compress.ejs')
})
app.get('/sort', (req, res) => {
    res.render(__dirname + '/views/sort.ejs')
})

//post requests
app.post('/sort', (req, res) => {
    fs.readFile(path.join(__dirname, 'files', 'writeto.json'), 'utf-8', (err, readData) => {
        if (err) throw err; // console.log('readData');// console.log(readData);
        readJson = JSON.parse(readData); // console.log('readJson'); // console.log(readJson);

        //WHAT IS LOCAL COMPARE???????
        sortedJson = readJson.sort((a, b) => a.n3.localeCompare(b.n3));
        fs.writeFile(path.join(__dirname, 'files', 'sortedto.json'), JSON.stringify(sortedJson), (err) => {
            if (err) throw err;

        })
    });

    res.redirect('/sort');
})
app.post('/compress', (req, res) => {
    decompressFile()
        // compressFile(__dirname + '/files/writeto.json')
    res.redirect('/compress');
})
app.post('/search', (req, res) => {
    searchQuery = req.body.search;
    searchData(searchQuery, datamila);
    res.redirect('/search');
})

app.post('/user', (req, res) => { // res.send(req.body);// console.log(req.body);
    formData = (req.body); // console.log('inside the callback');
    saveUserData(formData);
    res.redirect('/user');
});

let formData;
//user defined functions
const decompressFile = () => {
    gunzip(__dirname + '/files/writeto.json.gz', __dirname + '/files/decompressedWriteTo.json', () => {
        console.log('gunzip done!')
    })
}

const compressFile = (filePath) => {
    const stream = createReadStream(filePath);
    stream
        .pipe(createGzip())
        .pipe(createWriteStream(`${filePath}.gz`))
        .on("finish", () =>
            console.log(`Siccessfully compressed the file at ${filePath}`)
        );
};

const searchData = (query, callback) => {
    fs.readFile(path.join(__dirname, 'files', 'writeto.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        temp = JSON.parse(data).filter(
            (data) => {
                return data.n3 == query;
            }
        );
        callback(temp);
        console.log('here');
        console.log(temp);
    })
}

const datamila = (result) => {
    console.log('in datamila');
    // strJson = JSON.stringify(result);
    string = result[0].n2 + ' | | | ' + result[0].n3;
    console.log(string);
}

let saveUserData = (formJsonObj) => { // console.log(formJsonObj + 'formJsonObj works?');
    if (formJsonObj.n1 != '') {

        fs.readFile(path.join(__dirname, 'files', 'writeto.json'), 'utf-8', (err, readData) => {
            if (err) throw err; // console.log('readData');// console.log(readData);
            readJson = JSON.parse(readData); // console.log('readJson'); // console.log(readJson);
            lastId = readJson[readJson.length - 1].id;
            formJsonObj.id = (parseInt(lastId) + 1).toString();
            readJson.push(formJsonObj); // console.log('readJson after pushing');// console.log(readJson);
            fs.writeFile(path.join(__dirname, 'files', 'writeto.json'), JSON.stringify(readJson), (err) => {
                if (err) throw err;

            })
        });

        string = formJsonObj.id + formJsonObj.n1 + sep + formJsonObj.n2 + sep + formJsonObj.n3 + end;
        fs.appendFile(path.join(__dirname, 'files', 'writeto.txt'), string, (err) => {
            if (err) throw err;

        })

    }
}

// console.log(formData);

// fs.readFile(path.join(__dirname, 'files', 'writeto.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// })

// fs.appendFile(path.join(__dirname, 'files', 'starter.txt'), 'appended\n', (err) => {
//     if (err) throw err;
//     console.log('write complete');
// })

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`);
//     process.exit(1);
// })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function() {
    console.log("Server running on port 3000.")
})