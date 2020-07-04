module.exports = ({ config, codeGeneration }) => async (pattern = config.defaultPattern) => {
    const dirDataList = await codeGeneration.listDir(pattern);
    const scriptDataList = codeGeneration.generateScripts(dirDataList);
    await codeGeneration.writeScripts(scriptDataList);
};
