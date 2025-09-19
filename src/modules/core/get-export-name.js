const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ config, util }) => (pathname, config) => {
    const EXT_SET = new Set(config.applicableExtensions.map(e => e.toLowerCase()));

    // 1) Base name (strip extension only if the ext is in EXT_SET; ignore "isFile")
    //    ext includes the dot (e.g., ".js"); we lowercase for matching.
    const { name, ext } = path.parse(pathname);
    const cleanExt = (ext || '').slice(1).toLowerCase();
    const basenameMinusExtension = EXT_SET.has(cleanExt)
        ? name
        : path.basename(pathname);

    // 2) Remove sort prefix "<sortSeparator>..." (keep the right-hand side)
    const [basenameMinusSort] = basenameMinusExtension
        .split(config.sortSeparator)
        .reverse();

    // 3) Capture any leading non-[a-z] symbols separately so we can optionally re-attach
    const match = basenameMinusSort.match(/^([^a-z]+)?(.+)$/);
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

    // 7) AUTO mode
    let auto;
    if (config.preserveDots) {
        auto = util.legalJsName(keyBare)
            ? keyBare
            : (util.startsWithUpper(keyBare) ? pascal : camel);
    } else {
        auto = util.startsWithUpper(keyBare) ? pascal : camel;
    }

    const none = keyBare;
    const casing = { camel, pascal, auto, none };
    const keyCase = casing[config.case] ?? auto;

    // 8) Optionally re-attach original leading symbols
    if (config.keepLeadingSymbols) {
        return leadingSymbols + keyCase;
    }

    return keyCase;
};
