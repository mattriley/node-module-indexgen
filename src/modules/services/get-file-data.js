const camelCase = require('lodash.camelcase');

const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');

module.exports = ({ futil, util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = futil.extname(childPath);
    const basenameWithoutExt = futil.basenameWithoutExt(childPath);
    const key1 = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(key1);
    const key = util.legalJsName(key1) ? key1 : (util.startsWithUpper(key1) ? util.upperFirst(keyCamel) : keyCamel);
    const pathWithoutExt = `./${ext === '.json' ? childPath : basenameWithoutExt}`;
    const importPath = config.fullySpecified ? (isDir ? `./${childPath}${config.filename}` : `./${childPath}`) : pathWithoutExt;
    return { key, importPath };
};
