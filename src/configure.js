const compose = require('./compose');
const defaultConfig = require('./default-config.json');

module.exports = config => {

    const { codeGeneration } = compose({ ...defaultConfig, ...config });
    return codeGeneration.getCommands();

};
