module.exports = ({ util }) => (pathname, config) => {

    const isDir = pathname.endsWith('/');
    const ext = util.extname(pathname);
    const basenameWithoutExt = util.basenameWithoutExt(pathname);
    const fullySpecified = config.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? pathname : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? pathname + config.filename : pathname;
    const pathUnqualified = fullySpecified ? fullySpecifiedImportPath : pathWithoutExt;
    const pathQualified = `./${pathUnqualified}`;
    return pathQualified;

};
