module.exports = ({ provider }) => moduleData => {
    return { 
        dirPath: moduleData.dirPath, 
        script: provider.generateScript(moduleData) 
    };
};
