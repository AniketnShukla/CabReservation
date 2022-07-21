//This will execute when you post data
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const addCabs = async(req, res) => {
    try {
        console.log
        fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', (err, readData) => {
            if (err) throw err;
            // console.log("readinggg");
            readJsonArray = JSON.parse(readData);
            console.log('here');
            // lastCid = readJsonArray[readJsonArray.length - 1].n5;
            // cidNum = (lastCid.substring(1, ));
            // cidNum++;
            // cidString = 'C0' + cidNum;
            // console.log(cidString);
            const cab = {
                id: req.body.n1,
                carNo: req.body.n2,
                name: req.body.n3,
                type: req.body.n4,
                capacity: req.body.n5
            }
            console.log(cab);
            // res.send('aaaaa');
            // console.log("parsing done");
            readJsonArray.push(cab);
            console.log(readJsonArray);
            // console.log("readJsonArray");
            // console.log(readJsonArray);
            fs.writeFile(path.join(__dirname, '../', 'files', 'cabs.json'), JSON.stringify(readJsonArray), (err) => {
                if (err) throw err;
            })

            res.redirect('/AddCabs');
        })
    } catch (err) {
        // res.status(500).send();
        if (err) throw err;
    }
}

module.exports = addCabs;