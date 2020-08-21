const boot = require('./boot');
const { codeGeneration } = boot();
const { indexgen, watch } = codeGeneration.getCommands();
module.exports = { indexgen, watch };
