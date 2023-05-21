const camelCase = require('lodash.camelcase');

module.exports = ({ util }) => (pathname, config) => {

    const basenameMinusExtension = util.basenameWithoutExt(pathname);
    const [basenameMinusSort] = basenameMinusExtension.split(config.sortSeparator).reverse();
    const [, leadingSymbols = '', keyAlpha] = basenameMinusSort.match(/(^[$_]+)?(.+)/);
    const keyMaybeReversed = keyAlpha.split(config.reverseDelimiter).reverse().join(' ');
    const keyBeforeCamel = keyMaybeReversed;
    const keyCamel = camelCase(keyMaybeReversed);
    const keyMaybeUpperFirst = util.startsWithUpper(keyBeforeCamel) ? util.upperFirst(keyCamel) : keyCamel;
    const keyAlphaOrTransformed = util.legalJsName(keyBeforeCamel) ? keyAlpha : keyMaybeUpperFirst;
    const exportKey = leadingSymbols + (config.transformKeys ? keyAlphaOrTransformed : keyAlpha);
    return exportKey;

};
