module.exports = ({ config }) => paths => {

    const collator = new Intl.Collator([], { numeric: true });
    const DOT_RE = /\./g;

    // Known extensions to strip for dot counting
    const EXT_SET = new Set(['.js', '.mjs', '.cjs', '.jsx', '.json']);

    const baseForDotCount = path => {
        // Strip a known extension only if the dot is after the last slash
        const slash = path.lastIndexOf('/');
        const dot = path.lastIndexOf('.');
        if (dot > slash) {
            const ext = path.slice(dot);
            if (EXT_SET.has(ext)) {
                path = path.slice(0, dot);
            }
        }
        return path;
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
