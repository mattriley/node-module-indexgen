const path = require('path');

module.exports = ({ io }) => scripts => {
    return Promise.all(
        scripts.map(script => {
            const filePath = path.join(script.dirPath, 'index.js');
            return io.fs.promises.writeFile(filePath, script.content);
        })
    );
};
