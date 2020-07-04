#!/usr/bin/env node

const { indexgen } = require('..');
const pattern = process.argv[2];
indexgen(pattern);
