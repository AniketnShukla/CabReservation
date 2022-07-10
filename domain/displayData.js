//get request for displayData
//displays the admin selected Data
const fs = require('fs');
const path = require('path');

const displayData = (req, res) => {
    //hardcoded session.email as rerunning nodemon each time resets the session. Dont delete unless you plan to not rerun 
    //delete this line for deployment
    session = req.session;
    // session.email = 'aa@gmail.com';
    //check if user is logged in
    if (typeof session.email !== undefined) {
        //execute clause if no parameters are passed on the querystring
        if (Object.keys(req.params).length !== 0) {
            console.log(req.params.displayData);
            fs.readFile(path.join(__dirname, '../', 'files', (req.params.displayData + '.json')), 'utf-8', async(err, readData) => {
                    try {
                        if (err) throw err;
                        readJsonArray = JSON.parse(readData);
                        // const bookedCabs = await readJsonArray.filter(user => user.email === req.session.email);
                        // const cabs = bookedCabs.slice(0, 6); // console.log('cabs'); // console.log(cabs);
                        console.log(readJsonArray[0]);
                        res.render(__dirname + "./../views/displayData.ejs", { 'data': readJsonArray, 'reqparams': req.params });
                    } catch (err) {
                        if (err) throw err;
                    }

                })
                //execute if a parameter is passed on the query string, which as of now is the carNo
                //code to delete form the cancel button
                // } else if (req.query.carNo !== undefined) {
                //     fs.readFile(path.join(__dirname, '../', 'files', 'bookedUsers.json'), 'utf-8', async(err, readData) => {
                //         try {
                //             if (err) throw err;
                //             readJsonArray = JSON.parse(readData);
                //             console.log('carNo');
                //             console.log(req.query.carNo);
                //             console.log(typeof req.query.carNo);
                //             const bookedCabs = await readJsonArray.filter(user => user.carNo !== parseInt(req.query.carNo));
                //             console.log('bookedCabs After Change :33');
                //             console.log(bookedCabs);

            //             fs.writeFile(path.join(__dirname, '../', 'files', 'bookedUsers.json'), JSON.stringify(bookedCabs), (err) => {
            //                 if (err) throw err;
            //             })
            //             res.redirect('/bookedPage');
            //         } catch (err) {
            //             if (err) throw err;
            //         }

            //     })
            // }

        } else {
            res.redirect('/login');
        }
    }
}

module.exports = displayData;