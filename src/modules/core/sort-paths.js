const path = require('path');

module.exports = ({ config }) => {

    const EXT_SET = new Set(config.applicableExtensions);

    return paths => {

        const collator = new Intl.Collator([], { numeric: true });
        const DOT_RE = /\./g;

        const baseForDotCount = filePath => {
            const { dir, name, ext } = path.parse(filePath);
            // ext includes the dot, e.g. ".js"
            const cleanExt = ext.slice(1).toLowerCase();

            if (EXT_SET.has(cleanExt)) {
                // reconstruct path without the extension
                return dir ? path.join(dir, name) : name;
            }
            return filePath;
        };

        const dotCounts = Object.fromEntries(
            paths.map(p => {
                const base = baseForDotCount(p);

                // Only look at the substring *after* the sortSeparator
                const idx = base.indexOf(config.sortSeparator);
                const after = idx >= 0 ? base.slice(idx + config.sortSeparator.length) : base;

                const matches = after.match(DOT_RE);
                const count = matches ? matches.length : 0;
                return [p, count];
            })
        );

        const sortedPaths = paths.sort((a, b) => {
            const da = dotCounts[a];
            const db = dotCounts[b];
            if (db !== da) {
                return db - da; // most dots first
            }
            // tie-breaker: human-friendly numeric order
            return collator.compare(a, b);
        });

        return sortedPaths;

    };
};
