module.exports = ({ codeGeneration }) => async pattern => {
    const listOfDirData = await codeGeneration.listDirs(pattern);
    
    return listOfDirData
        .map(codeGeneration.getModuleData)
        .map(codeGeneration.getScriptData);
};
