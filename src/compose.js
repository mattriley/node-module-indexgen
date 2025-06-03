const defaultConfig = require('./default-config.js');
const modules = require('./modules');
const composer = require('module-composer');

module.exports = ({ overrides, config }) => {

    const { configure } = composer(modules, { overrides });

    const { compose } = configure(defaultConfig, config, config => {
        return { fullySpecified: config.fullySpecified ?? config.type === 'esm' };
    });

    const { io } = compose('io');
    const { util } = compose('util');
    const { renderers } = compose('renderers', { util });
    const { fsx } = compose('fsx', { io });
    const { core } = compose('core', { renderers, util });
    return compose('commands', { core, fsx, io });

};
