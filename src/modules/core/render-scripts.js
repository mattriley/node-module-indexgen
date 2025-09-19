module.exports = ({ self, renderers, config }) => dirDataList => {

    const renderScript = renderers[config.type];

    return dirDataList.map(dirData => {
        dirData.config = config.overrides[dirData.targetDir] ?? config;
        dirData.sortedChildPaths = self.sortPaths(dirData.childPaths);

        const files = dirData.sortedChildPaths.map(childPath => {
            const exportName = self.renderExportName(childPath, dirData.config);
            const importPath = self.renderImportPath(childPath, dirData.config);
            return { exportName, importPath };
        });

        const script = renderScript({ files });
        const dirPath = dirData.dirPath;
        return { dirPath, script };
    });

};
