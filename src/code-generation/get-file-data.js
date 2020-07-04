const camelCase = require('lodash.camelcase');
const path = require('path');

const dropLeadingUnderscoresAndDigits = str => str.match(/^_?(\d+)?(.+)/)[2];

module.exports = () => filePath => {
    const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    const identifier = camelCase(dropLeadingUnderscoresAndDigits(fileNameWithoutExt));
    const requirePath = `./${fileNameWithoutExt}`;
    return { [identifier]: requirePath };
};
