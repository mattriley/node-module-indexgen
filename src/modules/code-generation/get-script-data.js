module.exports = ({ config, providers }) => moduleData => {

    const { dirPath } = moduleData;
    const script = providers[config.type].generateScript(moduleData);
    return { dirPath, script };

};
