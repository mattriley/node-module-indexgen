const path = require('path');
const camelCase = require('lodash.camelcase');

const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');

module.exports = ({ util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = path.extname(childPath);
    const basenameWithoutExt = util.getBasenameWithoutExt(childPath);
    const key1 = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(key1);
    const key = util.startsWithUpper(key1) ? util.upperFirst(keyCamel) : keyCamel;
    const pathWithoutExt = `./${ext === '.json' ? childPath : basenameWithoutExt}`;
    const importPath = config.fullySpecified ? (isDir ? `./${childPath}${config.filename}` : `./${childPath}`) : pathWithoutExt;
    return { key, importPath };
};
