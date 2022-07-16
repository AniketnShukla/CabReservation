//get request for bookCab
const fs = require('fs');
const path = require('path');

const bookCab = (req, res) => {
    session = req.session;
    //hardcoded session.email as rerunning nodemon each time resets the session. Dont delete unless you plan to not rerun 
    //delete this line for deployment
    session.email = 'aa@gmail.com'
    console.log('in get request bookCab');
    if (Object.keys(req.query).length !== 0 && session.email !== undefined) {
        console.log('query processing clause');
        // console.log();
        type = req.query.type;
        console.log(type);
        //showing selected type data

        if (type !== undefined && req.query.id === undefined) {
            fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', async(err, readData) => {
                try {

                    if (err) throw err;
                    readJsonArray = JSON.parse(readData);
                    console.log('showing selected type data');
                    console.log('type if type not undef');
                    console.log(type);
                    const allCabs = await readJsonArray.filter(user => user.type === type);
                    const cabs = allCabs.slice(0, 6); //console.log('cabs');// console.log(cabs);
                    location = { pickup: req.query.pickup, destination: req.query.destination };
                    res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': cabs, 'location': location });
                } catch (err) {
                    if (err) throw err;
                }

            })
        }
        if (req.query.id !== undefined && session.email !== undefined) {
            fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', async(err, readData) => {
                if (err) throw err;
                console.log('query !== undef')
                cabsJsonArray = JSON.parse(readData);
                const cab = cabsJsonArray.find(user => user.id === req.query.id)

                userData = fs.readFileSync(path.join(__dirname, '../', 'files', 'users.json'), 'utf-8');
                userJsonArray = JSON.parse(userData);

                bookUser = await checkUser(userJsonArray, session); // console.log('bookUser');// console.log(bookUser);
                bookDetails = { name: bookUser[0].name, email: bookUser[0].email, carNo: cab.carNo, driver: cab.name, pickup: req.query.pickup, destination: req.query.destination, type: cab.type, capacity: cab.capacity }
                fs.readFile(path.join(__dirname, '../', "files", 'bookedUsers.json'), 'utf-8', (err, jsonData) => {
                    jsonObj = JSON.parse(jsonData); // console.log(jsonObj)
                    jsonObj.push(bookDetails);
                    fs.writeFile(path.join(__dirname, '../', "files", 'bookedUsers.json'), JSON.stringify(jsonObj), (err) => {
                        if (err) throw err;
                    })
                });
                fs.readFile(path.join(__dirname, '../', "files", 'bookedUsers.json'), 'utf-8', (err, jsonData) => {
                    jsonObj = JSON.parse(jsonData);
                    console.log('writing successful');
                    res.redirect('/bookedPage');
                    // res.redirect('/bookCab/' + jsonObj[jsonObj.length - 1].carNo);
                    // query = req.body;
                    // let type = query.type;
                    // fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', async(err, readData) => {
                    //     try {
                    //         if (err) throw err;
                    //         readJsonArray = JSON.parse(readData);
                    //         if (type != null) {
                    //             // console.log('if')
                    //             const allCabs = await readJsonArray.filter(user => user.type === query.type);
                    //             const cabs = allCabs.slice(0, 6);
                    //             res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': cabs })
                    //         }
                    //     } catch (err) {
                    //         if (err) throw err;
                    //     }
                    // })
                });
            })
        }
    }
    //params is for searching type.
    else if (req.params.type !== undefined) {
        console.log('in get request params processing');
        type = req.params.type;
        fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', async(err, readData) => {
                try {
                    if (err) throw err;
                    readJsonArray = JSON.parse(readData);
                    if (type !== undefined) {
                        const allCabs = await readJsonArray.filter(user => user.type === type);
                        const cabs = allCabs.slice(0, 6);
                        // console.log('cabs');
                        // console.log(cabs);
                        res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': cabs })
                    }
                    //capacity values passed, problem mostly lying in the await part, the filter function mostly not returning data before rendering.
                    // else res.redirect('/bookCab');
                } catch (err) {
                    if (err) throw err;
                }

            })
            // res.redirect('/bookCab/' + jsonObj[jsonObj.length - 1].carNo);  
    } else {
        console.log('last else');
        // if (req.query.id === undefined) {
        //     console.log(req.query.id);
        //     console.log('empty query');
        // }  if (session.email === undefined) {
        //     console.log('no session email');
        // 
        res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': null });
    }
};
//takes array of json objects as argument and the session
const checkUser = (userJsonArray, session) => {
    return new Promise((resolve, reject) => { // console.log(session.email);//filter's clause should be in one line  if its in this format, because it didnt work other way 
        a = userJsonArray.filter(user => user.email === session.email); // console.log('jere');// console.log(user.email + ' ' + session.email);// console.log(al);
        resolve(a);
    });
}

module.exports = bookCab;