const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config.json');

module.exports = ({ overrides, configs }) => {

    const { compose, config } = composer(modules, { overrides, defaultConfig, configs });
    const { io } = compose('io', {}, io => io.setup());
    const { util } = compose('util');
    const { futil } = compose('futil', { io });
    const { strategies } = compose('strategies', { util });
    const { lib } = compose('lib', { futil, util, config });
    const { effects } = compose('effects', { lib, config, io, futil, util, strategies });
    compose('commands', { effects, io, config });
    return compose.end();

};
