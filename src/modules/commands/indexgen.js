module.exports = ({ fsx, lib }) => async targetDir => {

    const dirDataList = await fsx.listDirAsync(targetDir);
    const scriptDataList = dirDataList.map(lib.getScriptData);
    await fsx.writeScriptsAsync(scriptDataList);

};
