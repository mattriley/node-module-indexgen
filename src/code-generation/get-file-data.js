const camelCase = require('lodash.camelcase');

const dropLeadingUnderscoresAndDigits = str => str.match(/^(_+)?(\d+)?(.+)/)[3];

module.exports = ({ util }) => filePath => {
    const fileNameWithoutExt = util.getFileNameWithoutExt(filePath);
    const key = camelCase(dropLeadingUnderscoresAndDigits(fileNameWithoutExt));
    const path = `./${fileNameWithoutExt}`;
    return { key, path };
};
