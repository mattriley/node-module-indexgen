module.exports = ({ codeGeneration }) => async targetDir => {

    const dirDataList = await codeGeneration.listDir(targetDir);

    const scriptDataList = dirDataList
        .map(codeGeneration.getModuleData)
        .map(codeGeneration.getScriptData);

    await codeGeneration.writeScripts(scriptDataList);

};
