module.exports = ({ self }) => dirData => {

    return dirData.sortedChildPaths.map(childPath => {
        const exportName = self.renderExportName(childPath, dirData.config);
        const importPath = self.renderImportPath(childPath, dirData.config);
        return { exportName, importPath };
    });

};
