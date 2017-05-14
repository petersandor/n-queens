#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');

program
	.version('1.0.0')
	.description('Calculates possible placements of N queens on NxN board')
	.usage('<n>')
	.parse(process.argv);

if (process.argv.length >= 2) {
	program.outputHelp();
	return;
}

