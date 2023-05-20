module.exports = ({ fsx, lib }) => async targetDir => {

    const dirDataList = await fsx.listDirAsync(targetDir);
    const scriptDataList = dirDataList.map(dirData => {
        const dirPath = dirData.dirPath;
        const script = lib.getScript(dirData);
        return { dirPath, script };
    });
    await fsx.writeScriptsAsync(scriptDataList);

};
