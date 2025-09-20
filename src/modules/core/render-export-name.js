const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ util, defaults }) => (pathname, config) => {
    config = { ...defaults, ...config };

    const {
        applicableExtensions = [],
        sortSeparator,
        reverseDelimiter,
        preserveDots,
        keepLeadingSymbols
    } = config;

    // 1) Strip extension only if it's in applicableExtensions
    const { name, ext } = path.parse(pathname);
    const cleanExt = ext ? ext.slice(1).toLowerCase() : '';
    const baseName = applicableExtensions.includes(cleanExt) ? name : path.basename(pathname);

    // 2) Keep only the right-hand side of the last sortSeparator occurrence
    const [afterSort] = baseName.split(sortSeparator).reverse();

    // 3) Capture any leading non-letters (ASCII) so we can optionally re-attach
    const m = afterSort.match(/^([^a-zA-Z]+)?(.+)$/);
    const leading = m?.[1] ?? '';
    const alphaPart = m?.[2] ?? afterSort;

    // 4) Reverse by reverseDelimiter (if provided) and join with '-'
    const reversed = reverseDelimiter ? alphaPart.split(reverseDelimiter).reverse().join('-') : alphaPart;

    // 5) Dots policy
    const normalized = preserveDots ? reversed : reversed.replace(/\./g, '-');

    const finalize = key => (keepLeadingSymbols ? leading + key : key);

    // 6) AUTO mode
    if (preserveDots) {
        if (util.legalJsName(normalized)) return finalize(normalized);
        const camel = normalized.split('.').map(camelCase).join('.');
        const pascal = util.upperFirst(camel);
        return finalize(util.startsWithUpper(normalized) ? pascal : camel);
    }

    const camel = camelCase(normalized);
    const pascal = util.upperFirst(camel);
    return finalize(util.startsWithUpper(normalized) ? pascal : camel);
};
