module.exports = ({ self, renderers, config }) => dirDataList => {

    const renderScript = renderers[config.type];

    return dirDataList.map(dirData => {
        dirData.config = config.overrides[dirData.targetDir] ?? config;
        dirData.sortedChildPaths = self.sortPaths(dirData.childPaths);
        const files = self.listScriptFiles(dirData);
        const script = renderScript({ files });
        const dirPath = dirData.dirPath;
        return { dirPath, script };
    });

};
