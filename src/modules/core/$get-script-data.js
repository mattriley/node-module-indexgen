module.exports = ({ self, renderers, config }) => dirDataList => {

    const renderScript = renderers[config.type];

    return dirDataList.map(dirData => {
        const dirPath = dirData.dirPath;
        const files = self.getScriptFiles(dirData);
        const script = renderScript({ files });
        return { dirPath, script };
    });


};
