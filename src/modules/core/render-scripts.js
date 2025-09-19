module.exports = ({ self, renderers, config }) => dirDataList => {

    const renderScript = renderers[config.type];

    return dirDataList.map(dirData => {
        dirData.sortedChildPaths = self.sortPaths(dirData.childPaths);
        dirData.files = dirData.sortedChildPaths.map(childPath => {
            const exportName = self.renderExportName(childPath, config.overrides[dirData.targetDir]);
            const importPath = self.renderImportPath(childPath, config.overrides[dirData.targetDir]);
            return { exportName, importPath };
        });
        dirData.script = renderScript(dirData);
        return dirData;
    });

};
