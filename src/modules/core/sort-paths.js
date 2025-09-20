const path = require('path');

const collator = new Intl.Collator([], { numeric: true });
const dotRe = /\./g;

module.exports = ({ config }) => paths => {
    const baseForDotCount = filePath => {
        const { dir, name, ext } = path.parse(filePath);
        const cleanExt = ext ? ext.slice(1).toLowerCase() : '';
        if (!config.applicableExtensions.includes(cleanExt)) return filePath;
        return dir ? path.join(dir, name) : name;
    };

    const dotCounts = Object.fromEntries(
        paths.map(filePath => {
            const base = baseForDotCount(filePath);
            const sepIndex = base.indexOf(config.sortSeparator);
            const after = sepIndex >= 0? base.slice(sepIndex + config.sortSeparator.length): base;

            const matches = after.match(dotRe);
            const count = matches ? matches.length : 0;
            return [filePath, count];
        })
    );

    return paths.sort((a, b) => {
        const da = dotCounts[a];
        const db = dotCounts[b];
        if (db !== da) return db - da; // most dots first
        return collator.compare(a, b); // tie-breaker
    });
};
