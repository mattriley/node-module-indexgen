const boot = require('./src/boot');
const { codeGeneration } = boot();
const { indexgen, watch } = codeGeneration.getCommands();
module.exports = { indexgen, watch };
