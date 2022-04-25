const fs = require('fs');
const glob = require('fast-glob');

module.exports = () => () => {

    const fsp = fs.promises;
    return { fs, fsp, glob };

};
