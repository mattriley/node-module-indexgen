module.exports = ({ io }) => async filePath => {

    try {
        const content = await io.fsp.readFile(filePath, 'utf-8');
        return [null, content];
    } catch (err) {
        return [err];
    }

};
