module.exports = ({ config, codeGeneration }) => async (targetDir = config.defaults.targetDir) => {
    const dirDataList = await codeGeneration.listDir(targetDir);
    const scriptDataList = codeGeneration.generateScripts(dirDataList);
    await codeGeneration.writeScripts(scriptDataList);
};
