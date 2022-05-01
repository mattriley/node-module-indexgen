const compose = require('./compose');
const defaultConfig = require('./default-config.json');

module.exports = (...configs) => {

    const config = Object.assign({}, defaultConfig, ...configs);
    const modules = compose(config);
    return { config, ...modules };

};
