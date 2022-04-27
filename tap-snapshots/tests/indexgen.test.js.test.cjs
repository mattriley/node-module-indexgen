/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`tests/indexgen.test.js TAP cjs > output 1`] = `
module.exports = {
    $LegalJsNameStartingWithDollarAndUpper: require('./$LegalJsNameStartingWithDollarAndUpper'),
    $legalJsNameStartingWithDollarAndLower: require('./$legalJsNameStartingWithDollarAndLower'),
    IllegalJsNameStartingWithNumberAndLower: require('./1-illegal-js-name-starting-with-number-and-lower'),
    IllegalJsNameStartingWithNumberAndUpper: require('./1-Illegal-js-name-starting-with-number-and-upper'),
    IllegalJsNameStartingWithUpper: require('./Illegal-js-name-starting-with-upper'),
    JsonFile: require('./JsonFile.json'),
    LegalJsNameStartingWithUpper: require('./LegalJsNameStartingWithUpper'),
    _LegalJsNameStartingWithUnderscoreAndUpper: require('./_LegalJsNameStartingWithUnderscoreAndUpper'),
    _legalJsNameStartingWithUnderscoreAndLower: require('./_legalJsNameStartingWithUnderscoreAndLower'),
    illegalJsNameStartingWithLower: require('./illegal-js-name-starting-with-lower'),
    legalJsNameStartingWithLower: require('./legalJsNameStartingWithLower')
};

`

exports[`tests/indexgen.test.js TAP esm > output 1`] = `
import $LegalJsNameStartingWithDollarAndUpper from './$LegalJsNameStartingWithDollarAndUpper';
import $legalJsNameStartingWithDollarAndLower from './$legalJsNameStartingWithDollarAndLower';
import IllegalJsNameStartingWithNumberAndLower from './1-illegal-js-name-starting-with-number-and-lower';
import IllegalJsNameStartingWithNumberAndUpper from './1-Illegal-js-name-starting-with-number-and-upper';
import IllegalJsNameStartingWithUpper from './Illegal-js-name-starting-with-upper';
import JsonFile from './JsonFile.json';
import LegalJsNameStartingWithUpper from './LegalJsNameStartingWithUpper';
import _LegalJsNameStartingWithUnderscoreAndUpper from './_LegalJsNameStartingWithUnderscoreAndUpper';
import _legalJsNameStartingWithUnderscoreAndLower from './_legalJsNameStartingWithUnderscoreAndLower';
import illegalJsNameStartingWithLower from './illegal-js-name-starting-with-lower';
import legalJsNameStartingWithLower from './legalJsNameStartingWithLower';

export default {
    $LegalJsNameStartingWithDollarAndUpper,
    $legalJsNameStartingWithDollarAndLower,
    IllegalJsNameStartingWithNumberAndLower,
    IllegalJsNameStartingWithNumberAndUpper,
    IllegalJsNameStartingWithUpper,
    JsonFile,
    LegalJsNameStartingWithUpper,
    _LegalJsNameStartingWithUnderscoreAndUpper,
    _legalJsNameStartingWithUnderscoreAndLower,
    illegalJsNameStartingWithLower,
    legalJsNameStartingWithLower
};

`
