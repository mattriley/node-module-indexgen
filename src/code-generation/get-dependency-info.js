const path = require('path');
const _ = require('lodash');

module.exports = () => filePath => {
    const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
    const identifier = _.camelCase(fileNameWithoutExt.match(/^_?(\d+)?(.+)/)[2]);
    const requirePath = `./${fileNameWithoutExt}`;
    return { identifier, requirePath };
};
