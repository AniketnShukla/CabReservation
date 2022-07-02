const fs = require('fs');
const path = require('path');


const bookCab = (req, res) => {
    session = req.session;
    //delete this line for deployment
    session.email = 'aniketshukla4496@gmail.com'
        // console.log(session);
    if (req.query.id != null && session.email != null) {
        let searchId = req.query.id;
        fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', async(err, readData) => {
            if (err) throw err;
            cabsJsonArray = JSON.parse(readData);
            const cab = cabsJsonArray.find(user => user.id === req.query.id)
                // console.log(cab);
            userData = fs.readFileSync(path.join(__dirname, '../', 'files', 'users.json'), 'utf-8');
            userJsonArray = JSON.parse(userData);

            bookUser = await checkUser(userJsonArray, session);
            // console.log(bookUser);
            bookDetails = { name: bookUser[0].name, email: bookUser[0].email, carNo: cab.carNo, driver: cab.name }
            fs.readFile(path.join(__dirname, '../', "files", 'bookedUsers.json'), 'utf-8', (err, jsonData) => {
                jsonObj = JSON.parse(jsonData);
                console.log(jsonObj)
                jsonObj.push(bookDetails);

                fs.writeFile(path.join(__dirname, '../', "files", 'bookedUsers.json'), JSON.stringify(jsonObj), (err) => {
                    if (err) throw err;
                })
            });
            res.redirect('/clientMain')
        })
    } else {
        if (req.query.id != null)
            console.log('empty query');
        else if (session.email == null) {
            console.log('no session email');
        }

        res.render(__dirname + "./../views/clientMain.ejs", { 'cabs': null });
    }
};
//takes array of json objects as argument and the session
const checkUser = (userJsonArray, session) => {
    return new Promise((resolve, reject) => {

        // console.log(session.email);
        a = userJsonArray.filter(user => user.email === session.email);
        resolve(a);
    });
}

module.exports = bookCab;