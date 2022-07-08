const fs = require('fs');
const path = require('path');

//goes to bookCab post request
const searchCabs = (req, res) => {
    if (req.body != null) {
        query = req.body;
        let type = query.type;
        let capacity = query.capacity;
        fs.readFile(path.join(__dirname, '../', 'files', 'cabs.json'), 'utf-8', async(err, readData) => {
            try {
                if (err) throw err;
                readJsonArray = JSON.parse(readData);
                if (type != null) {
                    // console.log('if')
                    const allCabs = await readJsonArray.filter(user => user.type === query.type);
                    const cabs = allCabs.slice(0, 6);
                    res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': cabs })
                }
                //capacity values passed, problem mostly lying in the await part, the filter function mostly not returning data before rendering.
                else if (capacity != '') {
                    console.log(query);
                    const allCabs = await readJsonArray.filter(user => user.capacity === query.capacity)
                    const cabs = allCabs.slice(0, 6);
                    console.log(cabs);
                    res.render(__dirname + "./../views/bookCab.ejs", { 'cabs': cabs })
                } else res.redirect('/bookCab');
            } catch (err) {
                if (err) throw err;
            }

        })
    } else {
        res.render(__dirname + "/views/bookCab.ejs", { 'cabs': null });
    }

}

module.exports = searchCabs;