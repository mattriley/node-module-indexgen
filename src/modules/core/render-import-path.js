const path = require('path');

module.exports = ({ defaults }) => (pathname, config) => {
    config = { ...defaults, ...config };

    const parsed = path.parse(pathname);
    const cleanExt = parsed.ext ? parsed.ext.slice(1).toLowerCase() : '';
    const hasKnownExt = config.applicableExtensions.includes(cleanExt);

    const basenameWithoutExt = hasKnownExt
        ? path.format({ ...parsed, base: undefined, ext: '' })
        : pathname;

    const isDir = pathname.endsWith('/');
    const fullySpecified = config.fullySpecified || cleanExt === 'json';

    if (fullySpecified && isDir) {
        return `./${pathname}${config.filename}`;
    }

    if (fullySpecified) {
        return `./${pathname}`;
    }

    if (isDir) {
        const normalized = basenameWithoutExt.endsWith('/')
            ? basenameWithoutExt.slice(0, -1)
            : basenameWithoutExt;
        return `./${normalized}`;
    }

    return `./${basenameWithoutExt}`;
};
