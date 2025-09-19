module.exports = ({ io, util }) => {

    return util.to(filePath => io.fsp.readFile(filePath, 'utf-8'));

};
