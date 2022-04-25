const p = require('path');

const camelCase = require('lodash.camelcase');

const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
const dropLeadingUnderscoresAndDigits = str => str.match(/^(_+)?(\d+)?(.+)/)[3];

module.exports = ({ util, config }) => ({ childPath }) => {
    const isDir = childPath.endsWith('/');
    const ext = p.extname(childPath);
    const basenameWithoutExt = util.getBasenameWithoutExt(childPath);
    const keyCamel = camelCase(dropLeadingUnderscoresAndDigits(basenameWithoutExt));
    const key = util.startsWithUpper(basenameWithoutExt) ? upperFirst(keyCamel) : keyCamel;
    const pathWithoutExt = `./${ext === '.json' ? childPath : basenameWithoutExt}`;
    const path = config.fullySpecified ? (isDir ? `./${childPath}${config.filename}` : `./${childPath}`) : pathWithoutExt;
    return { key, path };
};
