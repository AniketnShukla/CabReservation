const fs = require('fs');
const { createGzip } = require("zlib");
const { createReadStream, createWriteStream } = require('fs');

const compress = (req, res) => {
    if (Object.keys(req.params) !== 0) {

        filePath = __dirname + './../files/' + req.params.fileName + '.json';
        const stream = createReadStream(filePath);
        stream
            .pipe(createGzip())
            .pipe(createWriteStream(`${filePath}.gz`))
            .on("finish", () =>
                console.log(`Successfully compressed the file at ${filePath}`)
            );
        // res.sendFile(__dirname + '/files/users.json')
    } else {
        console.log('no parameter passed in compress')
        res.redirect('/adminLoginLanding');

    }
};

module.exports = compress;