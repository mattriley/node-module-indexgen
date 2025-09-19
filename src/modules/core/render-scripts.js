module.exports = ({ self, renderers, config }) => dirDataList => {

    const renderScript = renderers[config.type];

    return dirDataList.map(dirData => {
        dirData.sortedChildPaths = self.sortPaths(dirData.childPaths);
        const files = self.getScriptFiles(dirData);
        const script = renderScript({ files });
        const dirPath = dirData.dirPath;
        return { dirPath, script };
    });

};
