#!/usr/bin/env node

const minimist = require('minimist');
const { indexgen, watch } = require('..');
const args = minimist(process.argv.slice(2));
const [targetDir] = args._;
const { ext } = args;
indexgen(targetDir, ext);
if (args.watch) watch(targetDir, ext);
