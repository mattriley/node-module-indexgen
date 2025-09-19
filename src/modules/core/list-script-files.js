module.exports = ({ self, config }) => dirData => {

    const configFinal = config.overrides[dirData.targetDir] ?? config;

    const childDataList = dirData.sortedChildPaths.map(childPath => {
        const exportName = self.renderExportName(childPath, configFinal);
        const importPath = self.renderImportPath(childPath, configFinal);
        return { exportName, importPath };
    });

    return childDataList;

};
