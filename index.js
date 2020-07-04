const { promisify } = require('util');

const io = {
    fs: require('fs'),
    glob: promisify(require('glob'))
};

const initialise = require('./initialise');
const { codeGeneration } = initialise({ io });
const { indexgen, watch } = codeGeneration.getCommands();
module.exports = { indexgen, watch };
