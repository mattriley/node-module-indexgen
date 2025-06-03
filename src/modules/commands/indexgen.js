module.exports = ({ core, fsx }) => async targetDir => {

    const dirDataList = await fsx.listDirAsync(targetDir);
    const scriptDataList = core.renderScripts(dirDataList);
    await fsx.writeScriptsAsync(scriptDataList);

};
