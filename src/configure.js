const merge = require('lodash.merge');
const compose = require('./compose');
const defaultConfig = require('./config.json');

module.exports = ({ config = {}, overrides = {} }) => {

    const { codeGeneration } = compose({
        config: merge({}, defaultConfig, config),
        overrides
    });

    return codeGeneration.getCommands();

};
