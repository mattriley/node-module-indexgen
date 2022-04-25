const path = require('path');
const camelCase = require('lodash.camelcase');

module.exports = ({ util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = path.extname(childPath);
    const basenameWithoutExt = util.getBasenameWithoutExt(childPath);
    const keyCamel = camelCase(util.trimLeadingUnderscoresAndDigits(basenameWithoutExt));
    const key = util.startsWithUpper(basenameWithoutExt) ? basenameWithoutExt : keyCamel;
    const pathWithoutExt = `./${ext === '.json' ? childPath : basenameWithoutExt}`;
    const importPath = config.fullySpecified ? (isDir ? `./${childPath}${config.filename}` : `./${childPath}`) : pathWithoutExt;
    return { key, importPath };
};
