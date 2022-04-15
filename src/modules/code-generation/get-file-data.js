const camelCase = require('lodash.camelcase');

const firstIsUpper = str => str[0] === str[0].toUpperCase();
const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
const dropLeadingUnderscoresAndDigits = str => str.match(/^(_+)?(\d+)?(.+)/)[3];

module.exports = ({ util }) => filePath => {
    const basenameWithoutExt = util.getBasenameWithoutExt(filePath);
    const keyCamel = camelCase(dropLeadingUnderscoresAndDigits(basenameWithoutExt));
    const key = firstIsUpper(basenameWithoutExt) ? upperFirst(keyCamel) : keyCamel;
    const path = `./${basenameWithoutExt}`;
    return { key, path };
};
