const merge = require('lodash.merge');
const boot = require('./src/boot');
const defaultConfig = require('./src/config.json');

module.exports = (config = {}) => {

    const { codeGeneration } = boot({
        config: merge({}, defaultConfig, config)
    });

    return codeGeneration.getCommands();

};
