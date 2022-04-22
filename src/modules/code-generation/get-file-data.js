const p = require('path');

const camelCase = require('lodash.camelcase');

const firstIsUpper = str => str[0] === str[0].toUpperCase();
const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
const dropLeadingUnderscoresAndDigits = str => str.match(/^(_+)?(\d+)?(.+)/)[3];

module.exports = ({ util, config }) => filePath => {
    const ext = p.extname(filePath);
    const basenameWithoutExt = util.getBasenameWithoutExt(filePath);
    const keyCamel = camelCase(dropLeadingUnderscoresAndDigits(basenameWithoutExt));
    const key = firstIsUpper(basenameWithoutExt) ? upperFirst(keyCamel) : keyCamel;
    const pathWithoutExt = `./${ext === '.json' ? filePath : basenameWithoutExt}`;
    const path = config.trimExt ? pathWithoutExt : filePath;
    return { key, path };
};
