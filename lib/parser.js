const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const SAMLMetadata = require('./SAMLMetadata');

const parseFromString = (data) => {
    parser.parseString(data, function(err, result) {
        if (err) {
            throw Error('Error passing XML string');
        }
        let SAMLObj = new SAMLMetadata(result);
        //console.log(JSON.stringify(SAMLObj));
        return SAMLObj;
        //console.log(result.EntityDescriptor.$.entityID);
        //console.log('Done');
    });
}

const parseFromFile = (path) => {
    fs.readFile(path, function(err, data) {
        if (err) {
            throw Error('Error reading XML file');
        }

        let SAMLObj = parseFromString(data);
        console.log(JSON.stringify(SAMLObj));
        return SAMLObj;
    });
}

module.exports = {
    parseFromString,
    parseFromFile
}