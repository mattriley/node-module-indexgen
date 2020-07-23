const initialise = require('./initialise');
const { codeGeneration } = initialise();
const { indexgen, watch } = codeGeneration.getCommands();
module.exports = { indexgen, watch };
