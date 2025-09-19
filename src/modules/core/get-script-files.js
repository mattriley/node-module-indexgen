module.exports = ({ self, config }) => dirData => {

    const configFinal = config.overrides[dirData.targetDir] ?? config;

    const childDataList = dirData.sortedChildPaths.map(childPath => {
        const isFile = dirData.childFiles.includes(childPath);
        const exportName = self.getExportName(childPath, configFinal, { isFile });
        const importPath = self.getImportPath(childPath, configFinal);
        return { exportName, importPath };
    });

    return childDataList;

};
