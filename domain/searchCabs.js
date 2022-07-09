//goes to bookCab post request
const fs = require('fs');
const path = require('path');
console.log('in post')
const searchCabs = (req, res) => {
    console.log('post request searchCab')
    if (typeof req.body !== undefined) {
        type = req.body.type;
        let pickup = req.body.pickup;
        let destination = req.body.destination;
        console.log('type + pickup + destination');
        console.log(type + pickup + destination);

        res.redirect('/bookCab/?type=' + type + '&pickup=' + pickup + '&destination=' + destination);
        // res.redirect('/bookCab/' + jsonObj[jsonObj.length - 1].carNo);  
        // res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': null });


    }
}
module.exports = searchCabs;