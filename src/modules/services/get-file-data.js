const camelCase = require('lodash.camelcase');

const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]/i, '');
const isLegalName = str => RegExp(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/).test(str);

module.exports = ({ futil, util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = futil.extname(childPath);
    const basenameWithoutExt = futil.basenameWithoutExt(childPath);
    const key1 = trimLeadingIllegalCharacters(basenameWithoutExt);
    const keyCamel = camelCase(key1);
    const key = isLegalName(key1) ? key1 : (util.startsWithUpper(key1) ? upperFirst(keyCamel) : keyCamel);
    const pathWithoutExt = `./${ext === '.json' ? childPath : basenameWithoutExt}`;
    const importPath = config.fullySpecified ? (isDir ? `./${childPath}${config.filename}` : `./${childPath}`) : pathWithoutExt;
    return { key, importPath };
};
