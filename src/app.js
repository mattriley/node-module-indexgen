const merge = require('lodash.merge');
const compose = require('./compose');
const defaultConfig = require('./config.json');

module.exports = (config = {}) => {

    const { codeGeneration } = compose({
        config: merge({}, defaultConfig, config)
    });

    return codeGeneration.getCommands();

};
