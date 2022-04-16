const merge = require('lodash.merge');
const boot = require('./boot');
const defaultConfig = require('./config.json');

module.exports = (config = {}) => {

    const { codeGeneration } = boot({
        config: merge({}, defaultConfig, config)
    });

    return codeGeneration.getCommands();

};
