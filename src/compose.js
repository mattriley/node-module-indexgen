const normConfig = require('./norm-config.js');
const defaultConfig = require('./default-config.js');
const modules = require('./modules');
const composer = require('module-composer');

module.exports = ({ overrides, config } = {}) => {

    const { configure } = composer(modules, { overrides });

    const { compose } = configure(defaultConfig, config, config => {
        config = normConfig(config);

        const overrides = Object.entries(config.overrides ?? {}).map(([dirpath, configOverride]) => {
            configOverride = normConfig({ ...config, ...configOverride });
            return [dirpath, configOverride];
        });

        return { ...config, overrides };
    });

    const { io } = compose('io');
    const { util } = compose('util');
    const { renderers } = compose('renderers', { util });
    const { fsx } = compose('fsx', { io });
    const { core } = compose('core', { renderers, util });
    return compose('commands', { core, fsx, io });

};
