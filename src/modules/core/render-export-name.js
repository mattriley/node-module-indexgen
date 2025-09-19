const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ util }) => (pathname, config) => {
    const {
        applicableExtensions = [],
        sortSeparator,
        reverseDelimiter,
        preserveDots,
        keepLeadingSymbols
    } = config;

    // 1) Strip extension only if it's in applicableExtensions (case-insensitive compare done via cleanExt)
    const { name, ext } = path.parse(pathname);
    const cleanExt = ext ? ext.slice(1).toLowerCase() : '';
    const baseName = applicableExtensions.includes(cleanExt)
        ? name
        : path.basename(pathname);

    // 2) Keep only the right-hand side of the last sortSeparator occurrence
    const [afterSort] = baseName.split(sortSeparator).reverse();

    // 3) Capture any leading non-letters (ASCII) so we can optionally re-attach
    const m = afterSort.match(/^([^a-zA-Z]+)?(.+)$/);
    const leading = m?.[1] ?? '';
    const alphaPart = m?.[2] ?? afterSort;

    // 4) Reverse by reverseDelimiter (if provided) and join with '-'
    //    e.g. "bar,foo" -> ["bar","foo"] -> "foo-bar"
    const reversed = reverseDelimiter
        ? alphaPart.split(reverseDelimiter).reverse().join('-')
        : alphaPart;

    // 5) Dots policy
    const normalized = preserveDots ? reversed : reversed.replace(/\./g, '-');

    // 6) Build case variants
    const camel = preserveDots
        ? normalized.split('.').map(camelCase).join('.')
        : camelCase(normalized);
    const pascal = util.upperFirst(camel);

    // AUTO mode:
    // - preserveDots=true: keep as-is if it's a legal dotted identifier; otherwise pick by startsWithUpper
    // - preserveDots=false: always pick by startsWithUpper
    const keyAuto = preserveDots
        ? (util.legalJsName(normalized) ? normalized : (util.startsWithUpper(normalized) ? pascal : camel))
        : (util.startsWithUpper(normalized) ? pascal : camel);

    // 7) Optionally re-attach original leading symbols
    return keepLeadingSymbols ? (leading + keyAuto) : keyAuto;
};
