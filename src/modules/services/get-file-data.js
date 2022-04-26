const path = require('path');
const camelCase = require('lodash.camelcase');

const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');
const isLegalName = str => RegExp(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/).test(str);

module.exports = ({ util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = path.extname(childPath);
    const basenameWithoutExt = util.getBasenameWithoutExt(childPath);
    const key1 = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(key1);
    const key = isLegalName(key1) ? key1 : keyCamel;
    const pathWithoutExt = `./${ext === '.json' ? childPath : basenameWithoutExt}`;
    const importPath = config.fullySpecified ? (isDir ? `./${childPath}${config.filename}` : `./${childPath}`) : pathWithoutExt;
    return { key, importPath };
};
