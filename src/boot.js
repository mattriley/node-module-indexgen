const modules = require('./modules');
const composer = require('module-composer');
const defaultConfig = require('./config.json');

module.exports = ({ config = defaultConfig, overrides = {} }) => {

    const compose = composer(modules, { overrides });
    const io = compose('io', {}, io => io.setup());
    const providers = compose('providers');
    const util = compose('util');
    compose('codeGeneration', { config, io, util, providers });
    return compose.modules;

};
