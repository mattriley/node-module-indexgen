const camelCase = require('lodash.camelcase');

const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');

module.exports = ({ futil, util, config }) => ({ childPath }) => {

    const isDir = childPath.endsWith('/');
    const ext = futil.extname(childPath);
    const basenameWithoutExt = futil.basenameWithoutExt(childPath);
    const keyRaw = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(keyRaw);
    const key = util.legalJsName(keyRaw) ? keyRaw : (util.startsWithUpper(keyRaw) ? util.upperFirst(keyCamel) : keyCamel);
    const fullySpecified = config.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? childPath : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? `${childPath}${config.filename}` : `${childPath}`;
    const importPath = fullySpecified ? `./${fullySpecifiedImportPath}` : `./${pathWithoutExt}`;
    return { key, importPath };

};
