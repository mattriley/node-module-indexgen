const camelCase = require('lodash.camelcase');

const dropLeadingUnderscoresAndDigits = str => str.match(/^_?(\d+)?(.+)/)[2];

module.exports = ({ codeGeneration }) => filePath => {
    const fileNameWithoutExt = codeGeneration.getFileNameWithoutExt(filePath);
    const key = camelCase(dropLeadingUnderscoresAndDigits(fileNameWithoutExt));
    const path = `./${fileNameWithoutExt}`;
    return { key, path };
};
