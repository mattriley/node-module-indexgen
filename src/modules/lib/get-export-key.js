const camelCase = require('lodash.camelcase');

module.exports = ({ util }) => (pathname, config) => {

    const basenameMinusExtension = util.basenameWithoutExt(pathname);
    const [basenameMinusSort] = basenameMinusExtension.split(config.sortSeparator).reverse();
    const [, leadingSymbols = '', keyAlpha] = basenameMinusSort.match(/([^a-z]+)?(.+)/);
    const keyBare = keyAlpha.split(config.reverseDelimiter).reverse().join('-');

    const camel = camelCase(keyBare);
    const pascal = util.upperFirst(camel);
    const auto = util.legalJsName(keyBare) ? keyBare : util.startsWithUpper(keyBare) ? pascal : camel;
    const none = keyBare;
    const casing = { camel, pascal, auto, none };

    const keyCase = casing[config.case] ?? auto;

    if (config.keepLeadingSymbols) return leadingSymbols + keyCase;

    return keyCase;

};
