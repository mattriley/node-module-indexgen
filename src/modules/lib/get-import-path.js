module.exports = ({ util }) => (pathname, constants) => {

    const isDir = pathname.endsWith('/');
    const ext = util.extname(pathname);
    const basenameWithoutExt = util.basenameWithoutExt(pathname);
    const fullySpecified = constants.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? pathname : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? pathname + constants.filename : pathname;
    const pathUnqualified = fullySpecified ? fullySpecifiedImportPath : pathWithoutExt;
    const pathQualified = `./${pathUnqualified}`;
    return pathQualified;

};
