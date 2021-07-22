const parser = require('./lib/parser');
const util = require('util');

const getSAMLMetadata = async() => {
    try {
        const metadata = await parser.parseFromFile(__dirname + '/lib/metadata.xml', __dirname + '/lib/sp.xml', true);
        console.log(util.inspect(metadata, false, null, true));
    } catch (err) {
        console.log('Error: ', err);
    }
}

getSAMLMetadata();