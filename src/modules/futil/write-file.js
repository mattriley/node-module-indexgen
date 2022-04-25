module.exports = ({ io }) => async (filePath, content) => {

    try {
        await io.fsp.writeFile(filePath, content);
        return [null];
    } catch (err) {
        return [err];
    }

};
