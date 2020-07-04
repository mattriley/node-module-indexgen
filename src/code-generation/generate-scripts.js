module.exports = ({ codeGeneration }) => listOfDirData => {
    return listOfDirData
        .map(codeGeneration.getModuleData)
        .map(codeGeneration.getScriptData);
};
