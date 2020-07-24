const initialise = require('./src/initialise');
const { codeGeneration } = initialise();
const { indexgen, watch } = codeGeneration.getCommands();
module.exports = { indexgen, watch };
