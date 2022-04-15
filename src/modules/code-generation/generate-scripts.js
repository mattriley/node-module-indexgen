module.exports = ({ codeGeneration }) => dirDataList => {
    return dirDataList
        .map(codeGeneration.getModuleData)
        .map(codeGeneration.getScriptData);
};
