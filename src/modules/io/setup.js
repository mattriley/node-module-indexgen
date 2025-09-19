const fs = require('fs');
const glob = require('fast-glob');

module.exports = () => () => {

    const fsp = fs.promises;
    return { console, fs, fsp, glob };

};
