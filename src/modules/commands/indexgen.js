module.exports = ({ services }) => async targetDir => {

    const dirDataList = await services.listDirAsync(targetDir);
    const scriptDataList = dirDataList.map(services.getScriptData);
    await services.writeScriptsAsync(scriptDataList);

};
