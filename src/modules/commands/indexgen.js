module.exports = ({ codeGeneration }) => async targetDir => {

    const dirDataList = await codeGeneration.listDirAsync(targetDir);
    const scriptDataList = dirDataList.map(codeGeneration.getScriptData);
    await codeGeneration.writeScriptsAsync(scriptDataList);

};
