#!/usr/bin/env node

const minimist = require('minimist');
const { indexgen, watch } = require('..');
const args = minimist(process.argv.slice(2));
const [targetDir] = args._;
indexgen(targetDir);
if (args.watch) watch(targetDir);
