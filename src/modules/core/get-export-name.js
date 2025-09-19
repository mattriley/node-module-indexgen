const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ util }) => (pathname, config) => {

    // 1) Base name (strip extension only if the ext is in lowerExts)
    const { name, ext } = path.parse(pathname);
    const cleanExt = ext ? ext.slice(1).toLowerCase() : '';
    const basenameMinusExtension = config.applicableExtensions.includes(cleanExt)
        ? name
        : path.basename(pathname);

    // 2) Remove sort prefix "<sortSeparator>..." (keep the right-hand side)
    const [basenameMinusSort] = basenameMinusExtension
        .split(config.sortSeparator)
        .reverse();

    // 3) Capture any leading non-[a-z] symbols separately so we can optionally re-attach
    const match = basenameMinusSort.match(/^([^a-zA-Z]+)?(.+)$/);
    const leadingSymbols = match?.[1] ?? '';
    const keyAlpha = match?.[2] ?? basenameMinusSort;

    // 4) Apply reverseDelimiter transform, e.g. "bar,foo" -> "foo-bar"
    const keyBareRaw = keyAlpha
        .split(config.reverseDelimiter)
        .reverse()
        .join('-');

    // 5) Dots policy
    const keyBare = config.preserveDots
        ? keyBareRaw
        : keyBareRaw.replace(/\./g, '-');

    // 6) Cased variants
    const camel = config.preserveDots
        ? keyBare.split('.').map(camelCase).join('.')
        : camelCase(keyBare);
    const pascal = util.upperFirst(camel);

    let keyCase;
    if (config.preserveDots) {
        keyCase = util.legalJsName(keyBare)
            ? keyBare
            : (util.startsWithUpper(keyBare) ? pascal : camel);
    } else {
        keyCase = util.startsWithUpper(keyBare) ? pascal : camel;
    }

    // 8) Optionally re-attach original leading symbols
    return config.keepLeadingSymbols ? (leadingSymbols + keyCase) : keyCase;
};
