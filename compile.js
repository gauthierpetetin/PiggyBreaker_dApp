//compile.js

const path = require('path'); //required for cross-platform compatibility

const fs = require('fs');//file system module
const solc = require('solc');

const cryptoPiggyPath = path.resolve(__dirname, 'contracts', 'CryptoPiggy.sol');
const source = fs.readFileSync(cryptoPiggyPath, 'utf8');
module.exports = solc.compile(source, 1).contracts[':Piggies'];
