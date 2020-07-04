module.exports = ({ codeGeneration }) => async (targetDir, ext) => {
    const dirDataList = await codeGeneration.listDir(targetDir);
    const scriptDataList = codeGeneration.generateScripts(dirDataList);
    await codeGeneration.writeScripts(scriptDataList, ext);
};
