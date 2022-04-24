module.exports = ({ codeGeneration }) => async (targetDir) => {
    const dirDataList = await codeGeneration.listDir(targetDir);
    const scriptDataList = codeGeneration.generateScripts(dirDataList);
    await codeGeneration.writeScripts(scriptDataList);
};
