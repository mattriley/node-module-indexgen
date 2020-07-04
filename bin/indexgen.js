#!/usr/bin/env node

const { indexgen } = require('..');
const targetDir = process.argv[2];
indexgen(targetDir);
