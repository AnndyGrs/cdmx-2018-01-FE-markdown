#!/usr/bin/env node

const mdLinks = require('./markdown-links');
const [,, ... args] = process.argv;
const route = (args[0]);

mdLinks(route);