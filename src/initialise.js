const merge = require('lodash.merge');
const composeLib = require('module-composer')(require('./lib'));
const providers = require('./providers');

module.exports = (overrides = {}) => {

    const compose = (key, arg) => merge(composeLib(key, arg), overrides[key]);

    const config = compose('config');
    const io = compose('io');
    const provider = providers.cjs;
    const util = compose('util');
    const codeGeneration = compose('codeGeneration', { config, io, util, provider });
    
    return { codeGeneration };

};
