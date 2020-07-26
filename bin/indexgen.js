#!/usr/bin/env node

const minimist = require('minimist');
const { indexgen, watch } = require('..');
const args = minimist(process.argv.slice(2));
const paths = args._.length ? args._.filter(dir => Boolean(dir)) : ['./src'];

const lines = [
    args.watch ? 'Watching:' : 'Paths:',
    ...paths.map(p => `  ${p}`)
];

console.log(lines.join('\n'));
const { ext } = args;
paths.forEach(dir => indexgen(dir, ext));
if (args.watch) paths.forEach(dir => watch(dir, ext));
