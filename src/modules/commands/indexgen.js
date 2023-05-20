module.exports = ({ fsx, lib }) => async targetDir => {

    const dirDataList = await fsx.listDirAsync(targetDir);

    const scriptDataList = lib.getScriptData(dirDataList);

    await fsx.writeScriptsAsync(scriptDataList);

};
