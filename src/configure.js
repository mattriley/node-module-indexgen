const compose = require('./compose');
const defaultConfig = require('./default-config.json');

module.exports = userConfig => {

    const config = { ...defaultConfig, ...userConfig };
    const { codeGeneration } = compose({ config });
    const { indexgen, watch } = codeGeneration;
    return { indexgen, watch };

};
