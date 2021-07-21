const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const stripNS = require('xml2js').processors.stripPrefix;
const saml = require('./saml');

const parseFromString = async(xml) => {
    const parseString = util.promisify(xml2js.parseString);
    let result = await parseString(xml, { tagNameProcessors: [stripNS] });
    let samlObj = new saml(result);
    return samlObj;
}

const parseFromFile = async(path) => {
    const readFile = util.promisify(fs.readFile);
    let xml = await readFile(path);
    let samlObj = await parseFromString(xml);
    return samlObj;
}

module.exports = {
    parseFromString,
    parseFromFile
}