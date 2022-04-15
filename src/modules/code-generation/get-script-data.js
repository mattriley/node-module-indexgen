module.exports = ({ providers }) => moduleData => {
    return {
        dirPath: moduleData.dirPath,
        script: providers.cjs.generateScript(moduleData)
    };
};
