#!/usr/bin/env node

const minimist = require('minimist');
const { indexgen, watch } = require('..');
const args = minimist(process.argv.slice(2));
const targetDirs = args._;
const { ext } = args;
targetDirs.forEach(dir => indexgen(dir, ext));
if (args.watch) targetDirs.forEach(dir => watch(dir, ext));
