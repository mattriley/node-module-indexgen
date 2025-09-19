module.exports = ({ io, util }) => {

    return util.to((filePath, content) => io.fsp.writeFile(filePath, content));

};
