const compose = require('./compose');
const defaultConfig = require('./default-config.json');

module.exports = userConfig => {

    const config = { ...defaultConfig, ...userConfig };
    // console.log({ defaultConfig, userConfig, config });
    const { codeGeneration } = compose({ config });
    const { indexgen, watch } = codeGeneration;
    return { indexgen, watch };

};
