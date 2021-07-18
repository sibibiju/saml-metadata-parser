const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const SAMLMetadata = require('./SAMLMetadata');

const parseFromString = (xml) => {
    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let SAMLObj = new SAMLMetadata(result);
                resolve(SAMLObj);
            }
        });
    });
}

const parseFromFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, async(err, xml) => {
            if (err) {
                reject(err);
            } else {
                let SAMLObj = await parseFromString(xml);
                resolve(SAMLObj);
            }
        });
    });
}

module.exports = {
    parseFromString,
    parseFromFile
}