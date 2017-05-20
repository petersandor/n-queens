#!/usr/bin/env node

const program = require('commander');
const packageJson = require('./package');
const Solver = require('./solution/solver');

program
	.version(packageJson.version)
	.description('Calculates possible placements of N queens on NxN board')
	.option('-n, --number <n>', 'Number of queens and board size', parseInt)
	.option('-p, --print-all', 'Print all solutions found (n > 8 has hundreds)')

program.on('--help', () => {
	console.log('  Example usage:');
	console.log('');
	console.log('    $ ./queens.js -n 5 -p');
	console.log('');
});

program.parse(process.argv);

if (program.number > 0) {
	const solverInstance = new Solver({
		size: program.number,
		printAll: !!program.printAll
	});

	solverInstance.start();
}

if (process.argv.length <= 2) {
	program.outputHelp();
}

