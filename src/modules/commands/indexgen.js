module.exports = ({ effects, lib }) => async targetDir => {

    const dirDataList = await effects.listDirAsync(targetDir);
    const scriptDataList = dirDataList.map(lib.getScriptData);
    await effects.writeScriptsAsync(scriptDataList);

};
