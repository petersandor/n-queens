var board = require('../chess/board');

var N = +process.argv[2];

var iteration = 0;
var solutions = [];
var duplicates = [];
var fails = [];

function tryConfiguration(pos) {
	var b = new board(N);

	// ALL THE COMBINATIONS (...almost)
	// console.log('Placing first queen at', pos.x, pos.y);
	b.placeQueen(pos.x, pos.y);

	for (var x = 0; x < N; x++) {

		for (var y = 0; y < N; y++) {
			// console.log('Try placing at ', x, y);
			b.placeQueen(x, y);
		}
	}

	// Verification & output
	if (b.getQueenCount() === N) {
		var isUnique = solutions.every(function(solution) {
			return !solution.isEqualTo(b);
		});

		if (isUnique) {
			solutions.push(b);
		} {
			duplicates.push(b);
		}
	} else {
		fails.push(b);
	}

	console.log(b.toString());

	iteration++;
}

function start() {
	var firstQueenPos = {
		x: 0,
		y: 0,
		next: function() {
			if (this.y < (N - 1)) {
				this.y++;
			} else {
				this.y = 0;
				this.x++;
			}
		}
	};

	for (var i = 0; i < N * N; i++) {
		tryConfiguration(firstQueenPos);

		firstQueenPos.next();
	}

	// fails.forEach(function(solution) {
	// 	console.log(solution.toString());
	// });

	// solutions.forEach(function(solution) {
	// 	console.log(solution.toString());
	// });
}

start();

console.log('Found solutions:', solutions.length);
console.log('Fails', fails.length);
console.log('Duplicates', duplicates.length);
