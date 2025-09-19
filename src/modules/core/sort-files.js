module.exports = () => childPaths => {

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
                return path.slice(0, dot);
            }
        }
        return path;
    };

    const dotCounts = Object.fromEntries(
        childPaths.map(p => {
            const base = baseForDotCount(p);
            const matches = base.match(DOT_RE);
            const count = matches ? matches.length : 0;
            return [p, count];
        })
    );

    const sortedPaths = childPaths.sort((a, b) => {
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
