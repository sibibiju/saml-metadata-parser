const parser = require('./lib/parser');

const getData = async() => {
    let SAMLMetadata = await parser.parseFromFile(__dirname + '/lib/metadata.xml');
    console.log(SAMLMetadata);
}

getData();