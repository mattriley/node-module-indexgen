module.exports = ({ lib }) => dirDataList => {

    return dirDataList.map(dirData => {
        const dirPath = dirData.dirPath;
        const script = lib.getScript(dirData);
        return { dirPath, script };
    });


};
