const path = require('path');

module.exports = () => filePath => {
    return path.basename(filePath, path.extname(filePath));
};
