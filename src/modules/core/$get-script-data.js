module.exports = ({ self }) => dirDataList => {

    return dirDataList.map(dirData => {
        const dirPath = dirData.dirPath;
        const script = self.getScript(dirData);
        return { dirPath, script };
    });


};
