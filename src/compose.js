const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config.json');

module.exports = ({ overrides, configs }) => {

    const { compose, config } = composer(modules, { overrides, defaultConfig, configs });
    const { io } = compose('io', {}, io => io.setup());
    const { strategies } = compose('strategies');
    const { util } = compose('util');
    const { futil } = compose('futil', { io });
    const { effects } = compose('effects', { config, io, futil, util, strategies });
    compose('commands', { effects, io, config });
    return compose.end();

};
