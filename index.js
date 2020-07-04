const { promisify } = require('util');

const io = {
    fs: require('fs'),
    glob: promisify(require('glob'))
};

const initialise = require('./initialise');
const { indexgen } = initialise({ io });
module.exports = { indexgen };
