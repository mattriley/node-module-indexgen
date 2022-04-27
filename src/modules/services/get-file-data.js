const camelCase = require('lodash.camelcase');
const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');

module.exports = ({ futil, util, config }) => pathname => {

    const isDir = pathname.endsWith('/');
    const ext = futil.extname(pathname);
    const basenameWithoutExt = futil.basenameWithoutExt(pathname);
    const keyRaw = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(keyRaw);
    const keyTransformed = util.startsWithUpper(keyRaw) ? util.upperFirst(keyCamel) : keyCamel;
    const key = util.legalJsName(keyRaw) ? keyRaw : keyTransformed;
    const fullySpecified = config.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? pathname : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? pathname + config.filename : pathname;
    const importPath = fullySpecified ? fullySpecifiedImportPath : pathWithoutExt;
    return { key, importPath: `./${importPath}` };

};
