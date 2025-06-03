module.exports = ({ self, strategies, config }) => dirDataList => {

    const renderScript = strategies[config.type];

    return dirDataList.map(dirData => {
        const dirPath = dirData.dirPath;
        const files = self.getScriptFiles(dirData);
        const script = renderScript({ files });
        return { dirPath, script };
    });


};
