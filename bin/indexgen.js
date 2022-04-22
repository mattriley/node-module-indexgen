#!/usr/bin/env node

const minimist = require('minimist');
const configure = require('../app');
const args = minimist(process.argv.slice(2));
const paths = args._.length ? args._.filter(dir => Boolean(dir)) : ['./src/**'];

const parts = [
    args.watch ? 'Watching' : 'Generating',
    ...paths.map(p => `"${p}"`)
];

console.log(parts.join(' '));
const { ext, trimExt = true, type = 'cjs' } = args;
const { indexgen, watch } = configure({ ext, trimExt, type });
paths.forEach(dir => indexgen(dir, ext));
if (args.watch) paths.forEach(dir => watch(dir, ext));
