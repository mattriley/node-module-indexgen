const path = require('path');

module.exports = ({ util }) => (pathname, config) => {
    const EXT_SET = new Set(config.applicableExtensions.map(e => e.toLowerCase()));

    const parsed = path.parse(pathname);
    const cleanExt = parsed.ext.slice(1).toLowerCase();
    const hasKnownExt = EXT_SET.has(cleanExt);

    const basenameWithoutExt = hasKnownExt
        ? path.format({ ...parsed, base: undefined, ext: '' })
        : pathname;

    const isDir = pathname.endsWith('/');
    const fullySpecified = config.fullySpecified || cleanExt === 'json';

    let pathUnqualified;

    if (fullySpecified) {
        // keep slash for dirs, append filename
        pathUnqualified = isDir
            ? pathname + config.filename
            : pathname;
    } else {
        // strip extension if applicable
        pathUnqualified = basenameWithoutExt;
        // also strip trailing slash for dirs
        if (isDir && pathUnqualified.endsWith('/')) {
            pathUnqualified = pathUnqualified.slice(0, -1);
        }
    }

    return `./${pathUnqualified}`;
};
