const camelCase = require('lodash.camelcase');

const dropLeadingUnderscoresAndDigits = str => str.match(/^(_+)?(\d+)?(.+)/)[3];

module.exports = ({ util }) => filePath => {
    const basenameWithoutExt = util.getBasenameWithoutExt(filePath);
    const key = camelCase(dropLeadingUnderscoresAndDigits(basenameWithoutExt));
    const path = `./${basenameWithoutExt}`;
    return { key, path };
};
