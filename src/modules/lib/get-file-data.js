module.exports = ({ lib }) => (pathname, config) => {

    const exportKey = lib.getExportKey(pathname, config);
    const importPath = lib.getImportPath(pathname, config);
    return { exportKey, importPath };

};
