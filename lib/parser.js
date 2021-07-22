const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const stripNS = require('xml2js').processors.stripPrefix;
const saml = require('./saml');
const parseString = util.promisify(xml2js.parseString);
const readFile = util.promisify(fs.readFile);

const parseFromString = async(xml) => {
    let result = await parseString(xml, { tagNameProcessors: [stripNS] });
    let samlObj = new saml(result);
    return samlObj;
}

const parseFromFile = async(idpFilePath, spFilePath = null, getPassportConfig = false) => {
    let xml = await readFile(idpFilePath);
    let samlObj = await parseFromString(xml);

    if (spFilePath) {
        let sp = await readFile(spFilePath);
        let conf = await parseString(sp, { tagNameProcessors: [stripNS] });
        samlObj.configureSP(conf);
    }

    if (getPassportConfig === true) {
        return samlObj.getPassportConfig();
    }

    return samlObj;
}

module.exports = {
    parseFromString,
    parseFromFile
}