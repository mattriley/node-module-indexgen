module.exports = ({ effects }) => async targetDir => {

    const dirDataList = await effects.listDirAsync(targetDir);
    const scriptDataList = dirDataList.map(effects.getScriptData);
    await effects.writeScriptsAsync(scriptDataList);

};
