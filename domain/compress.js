const fs = require('fs');
const { createGzip } = require("zlib");
const { createReadStream, createWriteStream } = require('fs');

const compressFile = (req, res) => {
    filePath = __dirname + '/files/users.json';
    const stream = createReadStream(filePath);
    stream
        .pipe(createGzip())
        .pipe(createWriteStream(`${filePath}.gz`))
        .on("finish", () =>
            console.log(`Successfully compressed the file at ${filePath}`)
        );
    // res.sendFile(__dirname + '/files/users.json')

};

module.exports = compressFile;