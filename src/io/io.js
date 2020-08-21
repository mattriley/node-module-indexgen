const { promisify } = require('util');
const fs = require('fs');
const glob = require('glob');

module.exports = () => {

    return {
        fs,
        glob: promisify(glob)
    };

};