module.exports = ({ config, codeGeneration }) => async (pattern = config.defaultPattern) => {
    const listOfDirData = await codeGeneration.listDirs(pattern);
    const listOfScriptData = codeGeneration.generateScripts(listOfDirData);
    await codeGeneration.writeScripts(listOfScriptData);
};
