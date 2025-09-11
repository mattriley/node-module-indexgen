const camelCase = require('lodash.camelcase');
const path = require('path');

module.exports = ({ util }) => (pathname, config, { isFile }) => {

    // 1) Base name (strip extension for files)
    const basenameMinusExtension = isFile
        ? util.basenameWithoutExt(pathname)
        : path.basename(pathname);

    // 2) Remove sort prefix "<sort>--" (keep the right-hand side)
    const [basenameMinusSort] = basenameMinusExtension
        .split(config.sortSeparator)
        .reverse();

    // 3) Capture any leading non-[a-z] symbols separately so we can optionally re-attach
    //    (anchor the regex to avoid late matches)
    const match = basenameMinusSort.match(/^([^a-z]+)?(.+)$/);
    const leadingSymbols = match?.[1] ?? '';
    const keyAlpha = match?.[2] ?? basenameMinusSort;

    // 4) Apply reverseDelimiter transform
    //    e.g. "bar,foo" -> ["bar","foo"] -> "foo-bar"
    const keyBareRaw = keyAlpha
        .split(config.reverseDelimiter)
        .reverse()
        .join('-');

    // 5) Dots policy — when preserveDots=false,
    //    treat '.' as a word separator BEFORE any case logic,
    //    so dots cannot leak through 'auto' decisions.
    const keyBare = config.preserveDots
        ? keyBareRaw
        : keyBareRaw.replace(/\./g, '-');

    // 6) Build cased variants
    //    - If preserveDots=true, camelCase each dot-segment and rejoin with '.'
    //    - If preserveDots=false, just camelCase the whole thing (dots already replaced)
    const camel = config.preserveDots
        ? keyBare.split('.').map(camelCase).join('.')
        : camelCase(keyBare);

    const pascal = util.upperFirst(camel);

    // 7) AUTO mode:
    //    - If preserveDots=true: keep as-is when it’s a legal identifier; else choose pascal/camel based on initial upper.
    //    - If preserveDots=false: never keep the raw key (dots already normalized) — always choose pascal/camel.
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

    // 8) Optionally re-attach the original leading symbols
    if (config.keepLeadingSymbols) {
        return leadingSymbols + keyCase;
    }

    return keyCase;

};
