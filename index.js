const parser = require('./lib/parser');
const util = require('util');

const getSAMLMetadata = async() => {
    const metadata = await parser.parseFromFile(__dirname + '/lib/metadata.xml');
    console.log(util.inspect(metadata, false, null, true));
}

getSAMLMetadata();