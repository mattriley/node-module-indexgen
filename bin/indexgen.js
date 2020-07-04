#!/usr/bin/env node

const minimist = require('minimist');
const { indexgen, watch } = require('..');
const args = minimist(process.argv.slice(2));
const [targetDir = 'src'] = args._;
const ext = args.ext || 'js';
indexgen(targetDir, ext);
if (args.watch) watch(targetDir, ext);
