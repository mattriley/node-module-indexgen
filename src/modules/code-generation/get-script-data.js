module.exports = ({ config, providers }) => moduleData => {
    return {
        dirPath: moduleData.dirPath,
        script: providers[config.type].generateScript(moduleData)
    };
};
