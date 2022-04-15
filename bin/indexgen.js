#!/usr/bin/env node

const minimist = require('minimist');
const configure = require('..');
const args = minimist(process.argv.slice(2));
const paths = args._.length ? args._.filter(dir => Boolean(dir)) : ['./src'];

const parts = [
    args.watch ? 'Watching' : 'Generating',
    ...paths.map(p => `"${p}"`)
];

console.log(parts.join(' '));
const { ext, type = 'esm' } = args;
const { indexgen, watch } = configure({ ext, type });
paths.forEach(dir => indexgen(dir, ext));
if (args.watch) paths.forEach(dir => watch(dir, ext));
