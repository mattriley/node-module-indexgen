const camelCase = require('lodash.camelcase');
const trimLeadingIllegalCharacters = str => str.replace(/^[^$_a-z]+/i, '');

module.exports = ({ util }) => (pathname, config) => {

    const basenameWithoutExt = util.basenameWithoutExt(pathname);
    const keyMinusLeadingIllegalChars = trimLeadingIllegalCharacters(basenameWithoutExt);
    const [, leadingSymbols = '', keyAlpha] = keyMinusLeadingIllegalChars.match(/(^[$_]+)?(.+)/);
    const keyMaybeReversed = config.commaReverse ? keyAlpha.split(',').reverse().join(' ') : keyAlpha;
    const keyCamel = camelCase(keyMaybeReversed);
    const keyMaybeUpperFirst = util.startsWithUpper(keyAlpha) ? util.upperFirst(keyCamel) : keyCamel;
    const keyAlphaOrTransformed = util.legalJsName(keyAlpha) ? keyAlpha : keyMaybeUpperFirst;
    const exportKey = leadingSymbols + (config.transformKeys ? keyAlphaOrTransformed : keyAlpha);
    return exportKey;

};
