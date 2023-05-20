const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config.js');

module.exports = ({ overrides, configs }) => {

    const { compose, config } = composer(modules, { overrides, defaultConfig, configs });
    const { io } = compose('io', {}, io => io.setup());
    const { util } = compose('util');
    const { strategies } = compose('strategies', { util });
    const { lib } = compose('lib', { strategies, util, config });
    const { fsx } = compose('fsx', { config, io });
    compose('commands', { fsx, lib, io, config });
    return compose.end();

};
