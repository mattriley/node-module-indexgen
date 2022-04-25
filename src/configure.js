const compose = require('./compose');
const defaultConfig = require('./default-config.json');

module.exports = (userConfig, overrides = {}) => {

    const config = { ...defaultConfig, ...userConfig };
    return compose({ config, overrides }).commands;

};
