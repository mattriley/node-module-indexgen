const modules = require('./modules');
const composer = require('module-composer');
const defaultConfig = require('./config');

module.exports = ({ config = defaultConfig, overrides = {} }) => {

    const compose = composer(modules, {}, overrides);
    const io = compose('io', {}, io => io.setup());
    const providers = compose('providers');
    const provider = providers.cjs;
    const util = compose('util');
    compose('codeGeneration', { config, io, util, provider });

    return compose.getModules();

};
