const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config.json');

module.exports = ({ configs }) => {

    const { compose, config } = composer(modules, defaultConfig, configs);
    const { io } = compose('io', {}, io => io.setup());
    const { strategies } = compose('strategies');
    const { util } = compose('util');
    const { futil } = compose('futil', { io });
    const { services } = compose('services', { config, io, futil, util, strategies });
    return compose('commands', { services, io, config });

};
