const camelCase = require('lodash.camelcase');

const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');

module.exports = ({ futil, util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = futil.extname(childPath);
    const basenameWithoutExt = futil.basenameWithoutExt(childPath);
    const key1 = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(key1);
    const key = util.legalJsName(key1) ? key1 : (util.startsWithUpper(key1) ? util.upperFirst(keyCamel) : keyCamel);
    const fullySpecified = config.fullySpecified || ext === '.json';
    const pathWithoutExt = fullySpecified ? childPath : basenameWithoutExt;
    const fullySpecifiedImportPath = isDir ? `./${childPath}${config.filename}` : `./${childPath}`;
    const importPath = fullySpecified ? fullySpecifiedImportPath : `./${pathWithoutExt}`;
    return { key, importPath };
};
