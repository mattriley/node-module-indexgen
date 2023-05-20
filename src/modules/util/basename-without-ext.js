const path = require('path');

module.exports = () => filePath => path.basename(filePath, require('path').extname(filePath));
