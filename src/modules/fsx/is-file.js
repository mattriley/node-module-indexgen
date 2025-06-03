module.exports = ({ io }) => pathname => {

    try {
        const stats = io.fs.statSync(pathname);
        return stats.isFile();
    } catch (err) {
        console.error('Error reading path:', err);
        return false
    }

};
